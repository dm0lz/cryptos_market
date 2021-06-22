class MarketAnalyser

  def generate_report(market)
    return if market.pairs.count < 2
    tickers = market.pairs.map{|l| l.last_ticker if l.is_watched}.compact # Most recent ticker for pairs
    #binding.pry
    return if tickers.count < 2
    #begin
    return if tickers.empty?

    min_last = tickers.select{|l| l unless l.last.nil?}.sort_by{|l| l[:last]}.first
    max_last = tickers.select{|l| l unless l.last.nil?}.sort_by{|l| l[:last]}.last
    #rescue
    #  binding.pry
    #end
    #return if(min_last.nil? || max_last.nil?)
    raise "cannot generate report for Market #{market.id}" if(min_last.nil? || max_last.nil?)
    report = build_report(min_last, max_last, tickers)
    persist_report(report, market)
    report
  end

  def format_tickers tickers
    tickers.map do |ticker|
      {
        exchange_name: ticker.pair.exchange.name,
        ticker_id: ticker.id,
        pair_id: ticker.pair.id,
        last: ticker.last,
        bid: ticker.bid,
        ask: ticker.ask,
        spread: ticker.spread
      }
    end
  end

  def spread_report(market)
    tickers = market.pairs.map{|l| l.last_ticker }.compact
    min_bid_ticker = tickers.select{|l| l unless l.bid.nil?}.sort_by{|l| l[:bid]}.first
    max_ask_ticker = tickers.select{|l| l unless l.ask.nil?}.sort_by{|l| l[:ask]}.last
    raise "cannot generate report for Market #{market.id}" if(max_ask_ticker.nil? || min_bid_ticker.nil?)
    report = build_report_spread(min_bid_ticker, max_ask_ticker)
    persist_report(report, market)
    report
  end

  def reports
    markets = Market
      .left_joins(:pairs)
      .group(:id)
      .order('COUNT(pairs.id) DESC')
      .limit(10)
    markets.each do |market|
      market_id = market.id
      ReportCreatorJob.perform_later(market_id)
    end
  end

  def test_dev
    #binding.pry
    markets_of_interest = Market.of_interest
    pairs_of_interest = markets_of_interest.map(&:pairs)
  end

  def generate_report_for(market_name)
    market = Market.find_by(name: market_name)
    tickers = market.get_tickers
    min_last = tickers.sort_by!{|l| l[:last]}.first
    max_last = tickers.sort_by!{|l| l[:last]}.last
    report = build_report(min_last, max_last)
    #persist_market_report(report)
    report
  end

  def get_spreads_for_interesting_markets
    interesting_markets.map do |im|
      get_tickers_spread(im)
    end.sort_by!{|l| l[:price_difference]}
  end

  def interesting_markets
    Market.all.map{|l| l if l.pairs.count > 2}.compact
  end

  def get_tickers_spread(market)
    tickers = get_tickers_for(market)
    min_last = tickers.sort_by!{|l| l[:last]}.first
    max_last = tickers.sort_by!{|l| l[:last]}.last
    report = generate_report(min_last, max_last)
    persist_market_report(report)
    report
  end

  def persist_market_report report
    Report.create!(
      market_id: report[:market_id],
      price_difference: report[:price_difference],
      pairs: report[:pairs_involved],
      tickers: report[:all_tickers]
    )
  end

  def persist_report report, market
    Report.create!(
      market_id: market.id,
      price_difference: report[:price_difference],
      pairs: report[:pairs_involved],
      tickers: report[:all_tickers],
      spread: report[:spread]
    )
  end

  def get_tickers_for(market)
    tickers = market.pairs.map{|m| m.get_ticker}
    tickers.map do |ticker|
      {
        market: market.name,
        market_id: market.id,
        exchange: ticker.pair.exchange.name,
        ask: ticker.ask.to_f,
        bid: ticker.bid.to_f,
        last: ticker.last.to_f,
        timestamp: ticker.timestamp.to_f
      }
    end
  end

  def build_report min, max, tickers
    market_name = min.pair.market.name
    market_id = min.pair.market.id
    min_time = Time.at(min.timestamp) rescue 0
    max_time = Time.at(max.timestamp) rescue 0
    arbitrage_spread = ( (max.bid - min.ask) / (min.ask) ) * 100 rescue 0
    {
      market: market_name,
      market_id: market_id,
      price_difference: percentage_difference(min.last, max.last),
      pairs_involved: [
        { exchange: min.pair.exchange.name, pair_id: min.pair.id, ticker_id: min.id, last: min.last, spread: min.spread, ask: min.ask, bid: min.bid, timestamp: min_time },
        { exchange: max.pair.exchange.name, pair_id: max.pair.id, ticker_id: max.id, last: max.last, spread: max.spread, ask: max.ask, bid: max.bid, timestamp: max_time }
      ],
      all_tickers: format_tickers(tickers),
      spread: arbitrage_spread
    }
  end

  def build_tickers_report tickers
    market_name = tickers.first.pair.market.name
    market_id = tickers.first.pair.market.id
    {
      market: market_name,
      market_id: market_id,
      price_difference: percentage_difference(min.last, max.last),
      pairs_involved: [
        { exchange: min.pair.exchange.name, pair_id: min.pair.id, ticker_id: min.id, last: min.last, spread: min.spread, ask: min.ask, bid: min.bid, timestamp: min.timestamp },
        { exchange: max.pair.exchange.name, pair_id: max.pair.id, ticker_id: max.id, last: max.last, spread: max.spread, ask: max.ask, bid: max.bid, timestamp: max.timestamp }
      ],
      all_tickers: format_tickers(tickers)
    }
  end

  def build_report_spread min, max
    market_name = min.pair.market.name
    market_id = min.pair.market.id
    {
      market: market_name,
      market_id: market_id,
      price_difference: percentage_difference(min.bid, max.ask),
      pairs_involved: [
        { exchange: min.pair.exchange.name, pair_id: min.pair.id, ticker_id: min.id, last: min.last, ask: min.ask, bid: min.bid, timestamp: min.timestamp },
        { exchange: max.pair.exchange.name, pair_id: max.pair.id, ticker_id: max.id, last: max.last, ask: max.ask, bid: max.bid, timestamp: max.timestamp }
      ]
    }
  end

  def percentage_difference val_a, val_b
    val_a = val_a.to_f
    val_b = val_b.to_f
    result = ( (val_b - val_a) / (val_a + val_b) ) * 100
    result.nan? ? 0 : result
  end


end

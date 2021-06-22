class RestExchange::Tickers::Fetcher < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    tickers_payload = perform_request(@exchange.base_url, @exchange.get_tickers_path)
    puts "tickers payload is empty for #{@exchange.name}" and return unless tickers_payload

    @exchange.update_column(:last_ticker_request, DateTime.current)

    std_tickers = normalized_tickers(tickers_payload)

    std_tickers.each do |key, ticker|
      # binding.pry
      existing_pair = @exchange.pairs.find_by(name: key)
      unless existing_pair
        # Should not happen
        #binding.pry
        #raise "Pair does not exists"
         pair = Pair.new(
           name: key,
           base_currency: key.split("_").first,
           quote_currency: key.split("_").last
         )
         @exchange.pairs << pair
      else
        ticker = ::Ticker.create!(
          bid: ticker[mapping['bid']],
          ask: ticker[mapping['ask']],
          last: ticker[mapping['last']],
          high: ticker[mapping['high']],
          low: ticker[mapping['low']],
          timestamp: ticker[mapping['timestamp']],
          market_symbol: ticker[mapping['market_symbol']],
          volume: ticker[mapping['volume']],
          base_volume: ticker[mapping['base_volume']],
          quote_volume: ticker[mapping['quote_volume']],
          percent_change: ticker[mapping['percent_change']],
          original_payload: {key: key, ticker: ticker},
          pair_id: existing_pair.id
        )
      end
    end

  end

  private
  def mapping
    @exchange.tickers_data_map#.with_indifferent_access
  end

  def normalized_tickers tickers_payload
    if @exchange.name == 'poloniex'
      tickers_payload
    elsif @exchange.name == 'exmo'
      tickers_payload
    elsif @exchange.name == 'bittrex'
      tickers_payload['result'].map do |item|
        [item["MarketName"], item]
      end
    elsif @exchange.name == 'bleutrade'
      tickers_payload['result'].map do |item|
        [item["MarketName"], item]
      end
    elsif @exchange.name == 'coinexchange'
      tickers_payload['result'].map do |item|
        [item["MarketID"], item]
      end
    elsif @exchange.name == 'cryptopia'
      tickers_payload['Data'].map do |item|
        key = item["Label"].split('/').join('_')
        [key, item]
      end
    elsif @exchange.name == 'etherdelta'
      tickers_payload
    elsif @exchange.name == 'gate'
      tickers_payload
    elsif @exchange.name == 'hibtc'
      tickers_payload.map do |item|
        [item["symbol"], item]
      end
    elsif @exchange.name == 'quoine'
      tickers_payload.map do |item|
        [item['currency_pair_code'], item]
      end
    elsif @exchange.name == 'kucoin'
      tickers_payload['data'].map do |ticker|
        [ticker['symbol'], ticker]
      end
    elsif @exchange.name == 'binance'
      tickers_payload.map do |ticker|
        [ticker['symbol'], ticker]
      end
    elsif @exchange.name == 'southxchange'
      tickers_payload.map do |ticker|
        [ticker['Market'], ticker]
      end
    else
      tickers_payload
    end
  end

end

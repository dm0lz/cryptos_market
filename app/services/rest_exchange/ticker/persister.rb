class RestExchange::Ticker::Persister

  def initialize currency_pair, std_ticker
    @currency_pair = currency_pair
    @std_ticker = std_ticker
  end

  def call
    return nil unless @std_ticker
    ticker = ::Ticker.create!(
      bid: @std_ticker[mapping[:bid]],
      ask: @std_ticker[mapping[:ask]],
      last: @std_ticker[mapping[:last]],
      high: @std_ticker[mapping[:high]],
      low: @std_ticker[mapping[:low]],
      timestamp: @std_ticker[mapping[:timestamp]],
      market_symbol: @std_ticker[mapping[:market_symbol]],
      base_volume: @std_ticker[mapping[:base_volume]],
      volume: @std_ticker[mapping[:volume]],
      quote_volume: @std_ticker[mapping[:quote_volume]],
      percent_change: @std_ticker[mapping[:percent_change]],
      original_payload: @std_ticker[:original_payload],
      pair_id: @currency_pair.id
    )
    return ticker
  end

  private
  def mapping
    @currency_pair.exchange.ticker_data_map.with_indifferent_access
  end

end

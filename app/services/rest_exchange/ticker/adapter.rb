class RestExchange::Ticker::Adapter

  def initialize currency_pair, response_payload
    @currency_pair = currency_pair
    @response_payload = response_payload
  end

  def call
    if @currency_pair.exchange.name == 'bittrex'
      ticker = @response_payload['result'].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'poloniex'
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitfinex'
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'kraken'
      ticker = @response_payload["result"][@response_payload["result"].keys.first]
      { original_payload: @response_payload, ask: ticker["a"].first, bid: ticker["b"].first, last: ticker["c"].first, base_volume: "", volume: ticker["v"].last, quote_volume: "", percent_change: "", high: ticker["h"].last, low: ticker["l"].last, timestamp: '', market_symbol: @currency_pair.name }.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitstamp'
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'quoine'
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'hibtc'
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker[:c_timestamp] = Time.zone.parse(@response_payload['timestamp']).to_i
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bleutrade'
      ticker = @response_payload['result'].first.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'liqui'
      return nil if @response_payload['success'] == 0
      ticker = @response_payload[@response_payload.keys.first].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'yobit'
      ticker = @response_payload[@response_payload.keys.first].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'coinexchange'
      ticker = @response_payload['result'].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'wex'
      ticker = @response_payload[@response_payload.keys.first].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'cryptopia'
      ticker = @response_payload['Data'].with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    else
      ticker = @response_payload.with_indifferent_access
      ticker[:original_payload] = @response_payload
      ticker.with_indifferent_access
    end
  end

end

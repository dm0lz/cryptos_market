class RestExchange::TradeHistory::Adapter

  def initialize currency_pair, response_payload
    @currency_pair = currency_pair
    @response_payload = response_payload
  end

  def call
    if @currency_pair.exchange.name == 'bittrex'
      @response_payload['result'].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'poloniex'
      @response_payload.map do |hist|
        hist["event_timestamp"] = Time.parse(hist["date"]).to_i
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'bitfinex'
      @response_payload.map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'kraken'
      th_array = @response_payload['result'][@response_payload['result'].keys.first]
      th_array.map do |event|
        { original_payload: event, price: event[0], amount: event[1], event_timestamp: event[2], order_type: event[3] }.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'bitstamp'
      @response_payload.map do |td_hist|
        td_hist[:original_payload] = td_hist.with_indifferent_access
        ordertype = td_hist['type'] == '1' ? 'sell' : 'buy'
        td_hist[:order_type] = ordertype
        td_hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'quoine'
      @response_payload['models'].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'hibtc'
      @response_payload.map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'bleutrade'
      @response_payload['result'].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'liqui'
      return nil if @response_payload['success'] == 0
      @response_payload[@response_payload.keys.first].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'yobit'
      @response_payload[@response_payload.keys.first].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'coinexchange'
      return nil # there is no Trade History endpoint at coinexchange
    elsif @currency_pair.exchange.name == 'wex'
      @response_payload[@response_payload.keys.first].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'cryptopia'
      @response_payload['Data'].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'exmo'
      @response_payload[@response_payload.keys.first].map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    elsif @currency_pair.exchange.name == 'kucoin'
      th_array = @response_payload['data']
      th_array.map do |event|
        { original_payload: event, price: event[2], amount: event[3], event_timestamp: event[0], order_type: event[1] }.with_indifferent_access
      end
    else
      @response_payload.map do |hist|
        hist[:original_payload] = hist.with_indifferent_access
        hist.with_indifferent_access
      end
    end
  end

end

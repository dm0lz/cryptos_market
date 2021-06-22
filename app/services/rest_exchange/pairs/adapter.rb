class RestExchange::Pairs::Adapter
  # returns an Array of Hash

  def initialize exchange, response_payload
    @exchange = exchange
    @response_payload = response_payload
  end

  def call
    if @exchange.name == 'poloniex'
      @response_payload.map do |pair|
        { name: pair.first, base_currency: pair.first.split("_").first, quote_currency: pair.first.split("_").last, is_frozen: pair.last["isFrozen"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'bittrex'
      @response_payload['result'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'bitfinex'
      @response_payload.map do |pair|
        { name: pair['pair'], base_currency: pair["pair"][0..2].upcase, quote_currency: pair["pair"][3..5].upcase, minimum_order_size: pair["minimum_order_size"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'kraken'
      #binding.pry
      @response_payload["result"].map do |k,v|
        { name: k, base_currency: v['altname'][0..2], quote_currency: v['altname'][3..5], original_payload: {key: k, value: v} }.with_indifferent_access
      end
    elsif @exchange.name == 'bitstamp'
      @response_payload.map do |pair|
        { name: pair['url_symbol'], base_currency: pair["name"].split("/").first, quote_currency: pair["name"].split("/").last, minimum_order_size: pair["minimum_order"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'quoine'
      #binding.pry
      @response_payload.map do |pair|
        { name: pair['id'], base_currency: pair["base_currency"], quoted_currency: pair["quoted_currency"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'hibtc'
      @response_payload.map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'bleutrade'
      @response_payload['result'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'liqui'
      return [] if @response_payload['success'] == 0
      @response_payload['pairs'].map do |k,v|
        { name: k, base_currency: k.split('_').first.upcase, quote_currency: k.split('_').last.upcase, original_payload: {key: k, value: v}, min_amount: v["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'yobit'
      @response_payload['pairs'].map do |k,v|
        { name: k, base_currency: k.split('_').first.upcase, quote_currency: k.split('_').last.upcase, original_payload: {key: k, value: v}, min_amount: v["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'gate'
      @response_payload['pairs'].map do |k, v|
        { name: k.keys.first, base_currency: k.keys.first.split('_').first.upcase, quote_currency: k.keys.first.split('_').last.upcase, original_payload: {key: k.keys.first, value: k[k.keys.first]}, min_amount: k[k.keys.first]["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'coinexchange'
      @response_payload['result'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'wex'
      @response_payload['pairs'].map do |k,v|
        { name: k, base_currency: k.split('_').first.upcase, quote_currency: k.split('_').last.upcase, original_payload: {key: k, value: v}, min_amount: v["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'cryptopia'
      @response_payload['Data'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair[:name] = pair['Symbol'] + '_' + pair['BaseSymbol']
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'exmo'
      @response_payload.map do |k,v|
        { name: k, base_currency: k.split('_').first.upcase, quote_currency: k.split('_').last.upcase, original_payload: {key: k, value: v}, min_amount: v["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'etherdelta'
      @response_payload.map do |k,v|
        { name: k, base_currency: k.split('_').first.upcase, quote_currency: k.split('_').last.upcase, original_payload: {key: k, value: v}, min_amount: v["min_amount"] }.with_indifferent_access
      end
    elsif @exchange.name == 'binance'
      @response_payload['symbols'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'kucoin'
      @response_payload['data'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'southxchange'
      @response_payload.map do |pair|
        { name: "#{pair.first.upcase}/#{pair.last.upcase}", base_currency: pair.first.upcase, quote_currency: pair.last.upcase, original_payload: pair }.with_indifferent_access
      end
    else
      @response_payload.map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    end
  end

end

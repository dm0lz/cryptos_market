class RestExchange::Assets::Adapter
  # returns an Array of Hash

  def initialize exchange, response_payload
    @exchange = exchange
    @response_payload = response_payload
  end

  def call
    if @exchange.name == 'poloniex'
      @response_payload.map do |key, value|
        { original_payload: {key: key, value: value}, name: value['name'], iso_4217: key, txFee: value['txFee'], minConf: value['minConf'], disabled: value['disabled'], delisted: value['delisted'], frozen: value['frozen'] }.with_indifferent_access
      end
    elsif @exchange.name == 'bittrex'
      @response_payload['result'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'bitfinex'
      # Bitfiniex does not have an endpoint to get Currencies so we get them through pairs...
      bitfinex_transform(@response_payload)
    elsif @exchange.name == 'kraken'
      @response_payload['result'].map do |key, asset|
        asset[:original_payload] = {key: key, value: asset}.with_indifferent_access
        asset['name'] = key
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'bitstamp'
      bitfinex_transform @response_payload.map{|l| l['url_symbol']}
    elsif @exchange.name == 'quoine'
      assets_pair_array = @response_payload.map{|l| "#{l['base_currency']}-#{l['quoted_currency']}"}
      Transformers::PairsArrayToAssetsArrayV2.new(assets_pair_array).run
    elsif @exchange.name == 'hibtc'
      @response_payload.map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'bleutrade'
      @response_payload['result'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'liqui'
      return [] if @response_payload['success'] == 0
      pairs_array = @response_payload['pairs'].map{|k,v| k.sub('_', '-').upcase}
      Transformers::PairsArrayToAssetsArrayV2.new(pairs_array).run
    elsif @exchange.name == 'yobit'
      pairs_array = @response_payload['pairs'].map{|k,v| k.sub('_', '-').upcase}
      Transformers::PairsArrayToAssetsArrayV2.new(pairs_array).run
    elsif @exchange.name == 'gate'
      pairs_array = @response_payload
      Transformers::PairsArrayToAssetsArrayV3.new(pairs_array).run
    elsif @exchange.name == 'coinexchange'
      @response_payload['result'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'wex'
      pairs_array = @response_payload['pairs'].map{|k,v| k.sub('_', '-').upcase}
      Transformers::PairsArrayToAssetsArrayV2.new(pairs_array).run
    elsif @exchange.name == 'cryptopia'
      @response_payload['Data'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'exmo'
      @response_payload.map do |asset|
        { name: asset, iso_4217: asset, original_payload: asset }.with_indifferent_access
      end
    elsif @exchange.name == 'etherdelta'
      pairs_array = @response_payload.map{|k,v| k.sub('_', '-').upcase}
      Transformers::PairsArrayToAssetsArrayV2.new(pairs_array).run
    # elsif @exchange.name == 'binance'
    #   bitfinex_transform @response_payload.map{|l| l['symbol']}.uniq
    elsif @exchange.name == 'binance'
      @response_payload['symbols'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'kucoin'
      @response_payload['data'].map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    elsif @exchange.name == 'southxchange'
      @response_payload.map do |asset|
        { name: asset.first, iso_4217: asset.first, original_payload: asset }.with_indifferent_access
      end
    else
      @response_payload.map do |asset|
        asset[:original_payload] = asset.with_indifferent_access
        asset.with_indifferent_access
      end
    end
  end

  private
  def bitfinex_transform payload
    Transformers::PairsArrayToAssetsArray.new(payload).run
  end

end

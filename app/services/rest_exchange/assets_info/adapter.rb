class RestExchange::AssetsInfo::Adapter
  # returns an Array of Hash

  def initialize response_payload
    @response_payload = response_payload
  end

  def call
    @response_payload.map do |asset|
      asset[:original_payload] = asset.with_indifferent_access
      quote = asset['quote'].values[0]

      asset['original_id'] = asset['slug']
      asset['rank'] = asset['cmc_rank']
      asset['name'] = asset['name']
      asset['symbol'] = asset['symbol']
      asset['price_usd'] = quote['price']
      asset['price_btc'] = asset['price_btc']
      asset['volume_usd_24h'] = quote['volume_24h']
      asset['market_cap_usd'] = quote['market_cap']
      asset['available_supply'] = asset['circulating_supply']
      asset['total_supply'] = asset['total_supply']
      asset['max_supply'] = asset['max_supply']
      asset['percent_change_1h'] = quote['percent_change_1h']
      asset['percent_change_24h'] = quote['percent_change_24h']
      asset['percent_change_7d'] = quote['percent_change_7d']

      asset.with_indifferent_access
    end
  end

end

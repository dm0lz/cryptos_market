require 'rest-client'

class AssetsDescriptionFetcher

  def initialize
  end

  def call
    # symbols = AssetInfo.where(description: nil).take(50).pluck(:symbol).join(',')
    api_key = "f73c397d-d0df-4df1-8be7-164abc02e1a3"

    AssetInfo.all.each do |asset|
      begin
        endpoint = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=#{api_key}&aux=description&symbol=#{asset.symbol}"
        response = RestClient.get(
          endpoint,
          # authorization: @auth_header,
          content_type: :json,
          accept: :json,
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
        )
        res = JSON.parse(response)["data"]
        description = res.values.last["description"]
        asset_info = AssetInfo.find_by(symbol: res.keys.first)
        if asset_info
          asset_info.update_column(:description, description)
        else
          puts 'no asset info for ' + res.keys.first
        end
      rescue => exception
        #binding.pry
        puts exception
      end
      sleep(2.1)
    end

  end

end

require 'rest-client'

class RestExchange::MarketInfos::Fetcher < RestExchange::Base
  def initialize; end

  def call
    begin
      endpoint_url = "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=04447df6-bade-4ea1-972a-0775281386f2"
      response = ''
      begin
        response = RestClient.get(
          endpoint_url,
          # authorization: @auth_header,
          content_type: :json,
          accept: :json,
          user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
        )
      rescue RestClient::ExceptionWithResponse => e
        raise e
      rescue RestClient::RequestFailed => e
        raise e
      rescue Exception => e
        raise e
      end

      json_res = JSON.parse(response.body)
      response_payload = json_res['data']
    rescue StandardError
    end
    quote = response_payload["quote"]["USD"]
    market_infos = MarketInfo.find_or_create_by(id: 1)
    market_infos.update(market_cap: quote["total_market_cap"], volume_24h: quote["total_volume_24h"])
    market_infos
  end
end

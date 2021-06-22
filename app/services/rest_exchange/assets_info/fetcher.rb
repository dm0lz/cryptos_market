require 'rest-client'

class RestExchange::AssetsInfo::Fetcher < RestExchange::Base
  def initialize; end

  def call
    begin
      #endpoint_url = 'https://beta-pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=704ef30b-2660-407b-86c7-035eb810577e&sort=market_cap&start=1&limit=2500'
      endpoint_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=2500&convert=USD&CMC_PRO_API_KEY=04447df6-bade-4ea1-972a-0775281386f2'
      # response_payload = perform_request("https://api.coinmarketcap.com", "/v1/ticker/?limit=1500")
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
        puts "RestClient::ExceptionWithResponse Failing at #{@host + path}"
        puts e.response.body
        raise e
      rescue RestClient::RequestFailed => e
        puts "RestClient::RequestFailed at #{@host + path}"
        raise e
      rescue Exception => e
        puts "Exception at #{@host + path}"
        raise e
      end

      json_res = JSON.parse(response.body)
      response_payload = json_res['data']

      # request = HttpRequest.new(endpoint_url, )
      # response = request.get(path)
      # JSON.parse(response)

      # response_payload = perform_request(endpoint)
    rescue StandardError
      sleep(2)
      retry
    end
    assets_array = RestExchange::AssetsInfo::Adapter.new(response_payload).call
    asset_infos = RestExchange::AssetsInfo::Persister.new(assets_array).call
    asset_infos
  end
end

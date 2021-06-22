class RestExchange::Assets::Fetcher < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    begin
      response_payload = perform_request(@exchange.base_url, @exchange.get_assets_path)
    rescue
      sleep(2)
      retry
    end
    assets_array = RestExchange::Assets::Adapter.new(@exchange, response_payload).call
    exchange_assets_count = RestExchange::Assets::Persister.new(@exchange, assets_array).call
    return exchange_assets_count
  end

end

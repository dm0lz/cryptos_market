class RestExchange::Ticker::Fetcher < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    ticker_payload = perform_request(@currency_pair.exchange.base_url, ticker_api_path)

    exchange = @currency_pair.exchange
    exchange.update_column(:last_ticker_request, DateTime.current)
    #exchange.last_ticker_request = DateTime.current
    #exchange.save!

    std_ticker = RestExchange::Ticker::Adapter.new(@currency_pair, ticker_payload).call
    ticker = RestExchange::Ticker::Persister.new(@currency_pair, std_ticker).call
    return ticker
  end

  private
  def ticker_api_path
    @currency_pair.exchange.get_ticker_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end
end

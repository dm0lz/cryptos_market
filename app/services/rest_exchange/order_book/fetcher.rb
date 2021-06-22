class RestExchange::OrderBook::Fetcher < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    order_book_payload = perform_request(@currency_pair.exchange.base_url, order_book_api_path)
    std_order_book = RestExchange::OrderBook::Adapter.new(@currency_pair, order_book_payload).call
    order_book = RestExchange::OrderBook::Persister.new(@currency_pair, std_order_book).call
    return order_book
  end

  private
  def order_book_api_path
    @currency_pair.exchange.get_order_book_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end
end

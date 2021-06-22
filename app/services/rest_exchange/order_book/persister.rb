class RestExchange::OrderBook::Persister

  def initialize currency_pair, std_order_book
    @currency_pair = currency_pair
    @std_order_book = std_order_book
  end

  def call
    return nil unless @std_order_book
    order_book = ::OrderBook.create!(
      bids: @std_order_book[mapping[:bids]],
      asks: @std_order_book[mapping[:asks]],
      is_frozen: @std_order_book[mapping[:is_frozen]],
      original_payload: @std_order_book[:original_payload],
      pair_id: @currency_pair.id
    )
    return order_book
  end

  private
  def mapping
    @currency_pair.exchange.order_book_data_map.with_indifferent_access
  end

end

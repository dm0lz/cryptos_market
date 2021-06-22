class RestExchange::TradeHistory::Persister

  def initialize currency_pair, std_trade_history
    @currency_pair = currency_pair
    @std_trade_history = std_trade_history
  end

  def call
    return nil unless @std_trade_history
    @std_trade_history.each do |event|
      trade_history = ::TradeHistory.create!(
        order_type: event[mapping[:order_type]],
        amount: event[mapping[:amount]],
        price: event[mapping[:price]],
        total: event[mapping[:total]],
        fill_type: event[mapping[:fill_type]],
        event_timestamp: event[mapping[:event_timestamp]],
        original_payload: event[:original_payload],
        pair_id: @currency_pair.id
      )
    end
  end

  private
  def mapping
    @currency_pair.exchange.trade_history_data_map.with_indifferent_access
  end

end

class RestExchange::TradeHistory::Fetcher < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    trade_history_payload = perform_request(@currency_pair.exchange.base_url, trade_history_api_path)
    std_trade_history = RestExchange::TradeHistory::Adapter.new(@currency_pair, trade_history_payload).call
    trade_history = RestExchange::TradeHistory::Persister.new(@currency_pair, std_trade_history).call
    return trade_history
  end

  private
  def trade_history_api_path
    @currency_pair.exchange.get_trade_history_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end
end

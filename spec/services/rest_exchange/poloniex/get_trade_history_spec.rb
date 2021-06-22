require 'rails_helper'

RSpec.describe RestExchange::Poloniex::GetTradeHistory, type: :service do

  it "retrieves the Trade History for a given Asset pair from Poloniex" do
    trade_history = RestExchange::Poloniex::GetTradeHistory.new(Exchange.find_by(name: 'poloniex').pairs.first.name).call
    expect(trade_history.count).to be > 11
  end

end

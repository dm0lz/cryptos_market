require 'rails_helper'

RSpec.describe RestExchange::BitFinex::GetTradeHistory, type: :service do

  it "retrieves the Trade History for a given Asset pair from BitFinex" do
    trade_history = RestExchange::BitFinex::GetTradeHistory.new(Exchange.find_by(name: 'bitfinex').pairs.first.name).call
    expect(trade_history.count).to be > 11
  end

end

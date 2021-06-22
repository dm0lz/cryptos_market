require 'rails_helper'

RSpec.describe RestExchange::BitTrex::GetTradeHistory, type: :service do

  it "retrieves the Trade History for a given Asset pair from BitTrex" do
    trade_history = RestExchange::BitTrex::GetTradeHistory.new(Exchange.find_by(name: 'bittrex').pairs.first.name).call
    expect(trade_history.count).to be > 11
  end

end

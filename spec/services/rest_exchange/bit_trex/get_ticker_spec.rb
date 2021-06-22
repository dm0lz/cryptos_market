require 'rails_helper'

RSpec.describe RestExchange::BitTrex::GetTicker, type: :service do

  it "retrieves the Ticker for a given Asset pair from BitTrex" do
    ticker = RestExchange::BitTrex::GetTicker.new(Exchange.find_by(name: 'bittrex').pairs.first.name).call
    expect(ticker.class.name).to eq('Ticker')
  end

end

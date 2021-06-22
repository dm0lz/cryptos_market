require 'rails_helper'

RSpec.describe RestExchange::BitFinex::GetTicker, type: :service do

  it "retrieves the Ticker for a given Asset pair from BitFinex" do
    ticker = RestExchange::BitFinex::GetTicker.new(Exchange.find_by(name: 'bitfinex').pairs.first.name).call
    expect(ticker.class.name).to eq('Ticker')
  end

end

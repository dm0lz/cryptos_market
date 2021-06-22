require 'rails_helper'

RSpec.describe RestExchange::Poloniex::GetTickers, type: :service do

  it "retrieves all the Tickers from Poloniex" do
    ticker = RestExchange::Poloniex::GetTickers.new.call
    expect(ticker.count).to be > 11
  end

end

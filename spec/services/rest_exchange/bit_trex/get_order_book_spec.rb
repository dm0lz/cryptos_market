require 'rails_helper'

RSpec.describe RestExchange::BitTrex::GetOrderBook, type: :service do

  it "retrieves the OrderBook from BitTrex" do
    book = RestExchange::BitTrex::GetOrderBook.new(Exchange.find_by(name: 'bittrex').pairs.first.name).call
    expect(book.class.name).to eq('OrderBook')
    has_content = false
    has_content = true if(book.asks.count > 1 || book.bids.count > 1)
    expect(has_content).to be(true)
  end

end

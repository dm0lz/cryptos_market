RSpec.configure do |config|
  config.before :suite, type: :service do

    #filtered_examples = config.world.filtered_examples.map{|k,v| k.to_s}.map{|l| l.sub("RSpec::ExampleGroups::", "")}

    bit_trex = Exchange.find_by(name: 'bittrex')
    unless bit_trex
      puts "Creating Exchange: BitTrex ..."
      bit_trex = Exchange.create!(name: 'bittrex')
      bit_trex_currency_nb = RestExchange::BitTrex::GetCurrencies.new.call
      puts("Retrieved #{bit_trex_currency_nb} BitTrex Currencies")
      bit_trex_market_nb = RestExchange::BitTrex::GetMarkets.new.call
      puts("Retrieved #{bit_trex_market_nb} BitTrex Markets")
    end

    bit_finex = Exchange.find_by(name: 'bitfinex')
    unless bit_finex
      puts "Creating Exchange: BitFinex ..."
      bit_finex = Exchange.create!(name: 'bitfinex')
      bitfinex_currency_nb = RestExchange::BitFinex::GetCurrencies.new.call
      puts("Retrieved #{bitfinex_currency_nb} BitFinex Currencies")
      bitfinex_market_nb = RestExchange::BitFinex::GetMarkets.new.call
      puts("Retrieved #{bitfinex_market_nb} BitFinex Markets")
    end

    poloniex = Exchange.find_by(name: 'poloniex')
    unless poloniex
      puts "Creating Exchange: Poloniex ..."
      poloniex = Exchange.create!(name: 'poloniex')
      poloniex_currency_nb = RestExchange::Poloniex::GetCurrencies.new.call
      puts("Retrieved #{poloniex_currency_nb} Poloniex Currencies")
      poloniex_market_nb = RestExchange::Poloniex::GetMarkets.new.call
      puts("Retrieved #{poloniex_market_nb} Poloniex Markets")
    end

  end
end

class Pair < ApplicationRecord
  has_many :tickers
  has_many :order_books
  has_many :trade_histories
  belongs_to :exchange
  belongs_to :market

  scope :active, -> { where(is_active: true) }
  scope :watched, -> { where(is_watched: true) }

  def self.with_last_ticker
    with_last_ticker_id.map{|p| p if p.last_ticker}.compact
  end

  scope :with_last_ticker_id, -> {
    where.not(last_ticker_id: nil)
  }

  # Callback called from ticker after_commit
  def update_market_spread
    market.update_spread
  end

  def get_order_book
    RestExchange::OrderBook::Fetcher.new(self).call
  end

  def get_trade_history
    RestExchange::TradeHistory::Fetcher.new(self).call
  end

  def get_ticker
    if exchange.has_ticker_endpoint
      RestExchange::Ticker::Fetcher.new(self).call
    else
      puts("There is no ticker endpoint for #{exchange.name}")
    end
  end


  def exists_in_exchange exchange_array

  end

  def get_user_pair_path
    exchange.get_user_pair_path
  end


  def last_ticker
    Ticker.find(last_ticker_id) rescue nil
  end

end

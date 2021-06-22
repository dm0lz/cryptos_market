class Exchange < ApplicationRecord
  has_many :assets
  has_many :pairs
  has_many :markets, through: :pairs

  validates :name, uniqueness: true
  validates :name, presence: true

  scope :with_tickers_endpoint, -> { where(has_tickers_endpoint: true) }

  def get_assets
    RestExchange::Assets::Fetcher.new(self).call
  end

  def get_pairs
    RestExchange::Pairs::Fetcher.new(self).call
  end

  def get_tickers
    if has_tickers_endpoint
      RestExchange::Tickers::Fetcher.new(self).call
    else
      puts("There is no tickers endpoint for #{name}")
    end
  end

end

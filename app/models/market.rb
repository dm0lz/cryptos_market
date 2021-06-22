class Market < ApplicationRecord
  has_many :pairs
  has_many :exchanges, through: :pairs
  has_many :reports
  validates :name, uniqueness: true

  has_attached_file :base_currency_logo, styles: { medium: "300x300>", thumb: "20x20>" }, default_url: "/system/images/:style/missing.png"
  validates_attachment_content_type :base_currency_logo, content_type: /\Aimage\/.*\z/

  has_attached_file :quote_currency_logo, styles: { medium: "300x300>", thumb: "20x20>" }, default_url: "/system/images/:style/missing.png"
  validates_attachment_content_type :quote_currency_logo, content_type: /\Aimage\/.*\z/

  scope :of_interest, -> {
    where(is_watched: true)
  }

  # scope :with_active_pairs, -> {
  #   joins(:pairs).merge(Pair.with_last_ticker)
  # }

  scope :with_pairs, -> {
    left_joins(:pairs).group(:id).having("COUNT(pairs.id) > 1")
  }

  scope :credible, -> {
    where(price_difference: 2..90)
  }

  def self.with_active_pairs
    with_pairs.map{|m| m if m.pairs.with_last_ticker.count > 1 }.compact
  end

  def update_spread
    #binding.pry
    last_tickers = pairs.watched.with_last_ticker.map{|p| p.last_ticker if p.last_ticker}.compact
    return if last_tickers.length < 2

    lowest_ask = last_tickers.first.ask
    highest_bid = last_tickers.first.bid

    return if(!lowest_ask || !highest_bid) #happens with gate

    last_tickers.each do |last_ticker|
      return if(!last_ticker.ask || !last_ticker.bid)
      if last_ticker.ask < lowest_ask
        lowest_ask = last_ticker.ask
      end
      if last_ticker.bid > highest_bid
        highest_bid = last_ticker.bid
      end
    end

    exchange_spread = ((highest_bid - lowest_ask) / (lowest_ask)) * 100 rescue 0
    update_column(:spread, exchange_spread)
  end

end

# Pair.with_last_ticker_id.each do |pair|
#   pair.update_column(:last_ticker_id, nil) unless pair.last_ticker
# end

# Market.all.each do |market|
#   if market.pairs.watched.count < 2
#     market.update_column(:spread, nil)
#   end
# end

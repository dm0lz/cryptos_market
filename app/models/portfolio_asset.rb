class PortfolioAsset < ApplicationRecord
  belongs_to :portfolio
  belongs_to :asset_info

  validates_numericality_of :amount, greater_than: 0
end

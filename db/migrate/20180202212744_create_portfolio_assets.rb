class CreatePortfolioAssets < ActiveRecord::Migration[5.1]
  def change
    create_table :portfolio_assets do |t|
      t.references :portfolio, index: true, foreign_key: true
      t.references :asset_info, index: true, foreign_key: true
      t.string :symbol
      t.decimal :amount
      t.timestamps
    end
  end
end

class AddSpreadToMarkets < ActiveRecord::Migration[5.1]
  def change
    add_column :markets, :spread, :decimal
  end
end

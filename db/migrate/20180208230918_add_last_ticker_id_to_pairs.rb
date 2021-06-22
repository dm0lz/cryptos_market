class AddLastTickerIdToPairs < ActiveRecord::Migration[5.1]
  def change
    add_column :pairs, :last_ticker_id, :integer
    add_index :pairs, :last_ticker_id
  end
end

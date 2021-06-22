class CreateTickers < ActiveRecord::Migration[5.1]
  def change
    create_table :tickers do |t|
      t.decimal :bid
      t.decimal :ask
      t.decimal :spread
      t.decimal :last
      t.decimal :high
      t.decimal :low
      t.decimal :timestamp
      t.string :market_symbol
      t.decimal :volume
      t.decimal :base_volume
      t.decimal :quote_volume
      t.decimal :percent_change
      t.jsonb :original_payload, null: false, default: '{}'
      t.references :pair, index: true, foreign_key: true
      t.timestamps
    end
    add_index :tickers, :original_payload, using: :gin
  end
end

class CreateTradeHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :trade_histories do |t|
      t.references :pair, index: true, foreign_key: true
      t.string :order_type
      t.decimal :amount
      t.decimal :price
      t.decimal :total
      t.decimal :event_timestamp
      t.string :fill_type
      t.jsonb :original_payload, null: false, default: '{}'
      t.timestamps
    end
    add_index :trade_histories, :original_payload, using: :gin
  end
end

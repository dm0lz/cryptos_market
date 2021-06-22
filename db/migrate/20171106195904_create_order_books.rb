class CreateOrderBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :order_books do |t|
      t.jsonb :asks, null: false, default: '{}'
      t.jsonb :bids, null: false, default: '{}'
      t.boolean :is_frozen#, default: false
      t.references :pair, index: true, foreign_key: true
      t.jsonb :original_payload, null: false, default: '{}'
      t.timestamps
    end
    add_index :order_books, :asks, using: :gin
    add_index :order_books, :bids, using: :gin
    add_index :order_books, :original_payload, using: :gin
  end
end

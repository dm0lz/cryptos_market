class CreateAssets < ActiveRecord::Migration[5.1]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :iso_4217
      t.integer :min_confirmation
      t.decimal :tx_fee # decimal might not be enough ..?
      t.boolean :is_active#, default: true
      t.string :coin_type
      t.boolean :is_disabled#, default: false
      t.boolean :is_delisted#, default: false
      t.boolean :is_frozen#, default: false
      t.jsonb :original_payload, default: '{}'
      t.references :exchange, index: true, foreign_key: true
      t.timestamps
    end
    add_index :assets, :original_payload, using: :gin
  end
end

class CreateAssetInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :asset_infos do |t|
      t.string :original_id
      t.integer :rank
      t.string :name
      t.string :symbol
      t.decimal :price_usd
      t.decimal :price_btc
      t.decimal :volume_usd_24h
      t.decimal :market_cap_usd
      t.decimal :available_supply
      t.decimal :total_supply
      t.decimal :max_supply
      t.decimal :percent_change_1h
      t.decimal :percent_change_24h
      t.decimal :percent_change_7d
      t.integer :last_updated
      t.jsonb :original_payload

      t.timestamps
    end
  end
end

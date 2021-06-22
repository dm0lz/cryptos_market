class CreateMarketInfos < ActiveRecord::Migration[5.1]
  def change
    create_table :market_infos do |t|
      t.bigint :market_cap
      t.bigint :volume_24h

      t.timestamps
    end
  end
end

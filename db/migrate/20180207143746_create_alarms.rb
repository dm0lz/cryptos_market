class CreateAlarms < ActiveRecord::Migration[5.1]
  def change
    create_table :alarms do |t|
      t.references :user, foreign_key: true
      t.references :asset_info, foreign_key: true
      t.decimal :min_limit
      t.decimal :max_limit
      t.boolean :is_active, default: true
      t.boolean :has_min_limit, default: false
      t.boolean :has_max_limit, default: false
      t.string :asset_symbol
      t.timestamps
    end
  end
end

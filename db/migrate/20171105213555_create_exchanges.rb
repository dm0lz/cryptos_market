class CreateExchanges < ActiveRecord::Migration[5.1]
  def change
    create_table :exchanges do |t|
      t.string :name
      t.string :base_url
      t.string :get_assets_path
      t.string :get_pairs_path
      t.string :get_order_book_path
      t.string :get_tickers_path
      t.string :get_ticker_path
      t.string :get_trade_history_path
      t.boolean :has_assets_endpoint
      t.boolean :has_ticker_endpoint
      t.boolean :has_tickers_endpoint
      t.jsonb :endpoint_request_limit, null: false, default: '{}'
      t.datetime :last_ticker_request
      t.jsonb :asset_data_map, null: false, default: '{}'
      t.jsonb :pair_data_map, null: false, default: '{}'
      t.jsonb :order_book_data_map, null: false, default: '{}'
      t.jsonb :tickers_data_map, null: false, default: '{}'
      t.jsonb :ticker_data_map, null: false, default: '{}'
      t.jsonb :trade_history_data_map, null: false, default: '{}'
      t.timestamps
    end
    add_index :exchanges, :asset_data_map, using: :gin
    add_index :exchanges, :pair_data_map, using: :gin
    add_index :exchanges, :order_book_data_map, using: :gin
    add_index :exchanges, :tickers_data_map, using: :gin
    add_index :exchanges, :ticker_data_map, using: :gin
    add_index :exchanges, :trade_history_data_map, using: :gin
    add_index :exchanges, :endpoint_request_limit, using: :gin
  end
end

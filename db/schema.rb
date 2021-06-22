# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20210107171108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "alarms", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "asset_info_id"
    t.decimal "min_limit"
    t.decimal "max_limit"
    t.boolean "is_active", default: true
    t.boolean "has_min_limit", default: false
    t.boolean "has_max_limit", default: false
    t.string "asset_symbol"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_info_id"], name: "index_alarms_on_asset_info_id"
    t.index ["user_id"], name: "index_alarms_on_user_id"
  end

  create_table "asset_infos", force: :cascade do |t|
    t.string "original_id"
    t.integer "rank"
    t.string "name"
    t.string "symbol"
    t.decimal "price_usd"
    t.decimal "price_btc"
    t.decimal "volume_usd_24h"
    t.decimal "market_cap_usd"
    t.decimal "available_supply"
    t.decimal "total_supply"
    t.decimal "max_supply"
    t.decimal "percent_change_1h"
    t.decimal "percent_change_24h"
    t.decimal "percent_change_7d"
    t.integer "last_updated"
    t.jsonb "original_payload"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "logo_file_name"
    t.string "logo_content_type"
    t.bigint "logo_file_size"
    t.datetime "logo_updated_at"
    t.text "description"
  end

  create_table "assets", force: :cascade do |t|
    t.string "name"
    t.string "iso_4217"
    t.integer "min_confirmation"
    t.decimal "tx_fee"
    t.boolean "is_active"
    t.string "coin_type"
    t.boolean "is_disabled"
    t.boolean "is_delisted"
    t.boolean "is_frozen"
    t.jsonb "original_payload", default: "{}"
    t.bigint "exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exchange_id"], name: "index_assets_on_exchange_id"
    t.index ["original_payload"], name: "index_assets_on_original_payload", using: :gin
  end

  create_table "exchanges", force: :cascade do |t|
    t.string "name"
    t.string "base_url"
    t.string "get_assets_path"
    t.string "get_pairs_path"
    t.string "get_order_book_path"
    t.string "get_tickers_path"
    t.string "get_ticker_path"
    t.string "get_trade_history_path"
    t.boolean "has_assets_endpoint"
    t.boolean "has_ticker_endpoint"
    t.boolean "has_tickers_endpoint"
    t.jsonb "endpoint_request_limit", default: "{}", null: false
    t.datetime "last_ticker_request"
    t.jsonb "asset_data_map", default: "{}", null: false
    t.jsonb "pair_data_map", default: "{}", null: false
    t.jsonb "order_book_data_map", default: "{}", null: false
    t.jsonb "tickers_data_map", default: "{}", null: false
    t.jsonb "ticker_data_map", default: "{}", null: false
    t.jsonb "trade_history_data_map", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "get_user_pair_path"
    t.boolean "is_fetching_tickers", default: false
    t.string "country"
    t.index ["asset_data_map"], name: "index_exchanges_on_asset_data_map", using: :gin
    t.index ["endpoint_request_limit"], name: "index_exchanges_on_endpoint_request_limit", using: :gin
    t.index ["order_book_data_map"], name: "index_exchanges_on_order_book_data_map", using: :gin
    t.index ["pair_data_map"], name: "index_exchanges_on_pair_data_map", using: :gin
    t.index ["ticker_data_map"], name: "index_exchanges_on_ticker_data_map", using: :gin
    t.index ["tickers_data_map"], name: "index_exchanges_on_tickers_data_map", using: :gin
    t.index ["trade_history_data_map"], name: "index_exchanges_on_trade_history_data_map", using: :gin
  end

  create_table "market_infos", force: :cascade do |t|
    t.bigint "market_cap"
    t.bigint "volume_24h"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "markets", force: :cascade do |t|
    t.string "name"
    t.string "base_currency"
    t.string "quote_currency"
    t.decimal "price_difference"
    t.boolean "is_watched", default: false
    t.boolean "has_opportunity", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "spread"
    t.string "base_currency_logo_file_name"
    t.string "base_currency_logo_content_type"
    t.bigint "base_currency_logo_file_size"
    t.datetime "base_currency_logo_updated_at"
    t.string "quote_currency_logo_file_name"
    t.string "quote_currency_logo_content_type"
    t.bigint "quote_currency_logo_file_size"
    t.datetime "quote_currency_logo_updated_at"
  end

  create_table "order_books", force: :cascade do |t|
    t.jsonb "asks", default: "{}", null: false
    t.jsonb "bids", default: "{}", null: false
    t.boolean "is_frozen"
    t.bigint "pair_id"
    t.jsonb "original_payload", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asks"], name: "index_order_books_on_asks", using: :gin
    t.index ["bids"], name: "index_order_books_on_bids", using: :gin
    t.index ["original_payload"], name: "index_order_books_on_original_payload", using: :gin
    t.index ["pair_id"], name: "index_order_books_on_pair_id"
  end

  create_table "pairs", force: :cascade do |t|
    t.string "name"
    t.string "quote_currency"
    t.string "base_currency"
    t.decimal "min_trade_size"
    t.boolean "is_active"
    t.boolean "is_frozen"
    t.boolean "is_watched", default: false
    t.jsonb "original_payload", default: "{}", null: false
    t.bigint "exchange_id"
    t.bigint "market_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "last_ticker_id"
    t.index ["exchange_id"], name: "index_pairs_on_exchange_id"
    t.index ["last_ticker_id"], name: "index_pairs_on_last_ticker_id"
    t.index ["market_id"], name: "index_pairs_on_market_id"
    t.index ["original_payload"], name: "index_pairs_on_original_payload", using: :gin
  end

  create_table "portfolio_assets", force: :cascade do |t|
    t.bigint "portfolio_id"
    t.bigint "asset_info_id"
    t.string "symbol"
    t.decimal "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_info_id"], name: "index_portfolio_assets_on_asset_info_id"
    t.index ["portfolio_id"], name: "index_portfolio_assets_on_portfolio_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_portfolios_on_user_id"
  end

  create_table "reports", force: :cascade do |t|
    t.bigint "market_id"
    t.jsonb "pairs", default: "{}", null: false
    t.jsonb "tickers", default: "{}", null: false
    t.decimal "price_difference"
    t.boolean "is_opportunity", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "spread"
    t.index ["market_id"], name: "index_reports_on_market_id"
    t.index ["pairs"], name: "index_reports_on_pairs", using: :gin
  end

  create_table "tickers", force: :cascade do |t|
    t.decimal "bid"
    t.decimal "ask"
    t.decimal "spread"
    t.decimal "last"
    t.decimal "high"
    t.decimal "low"
    t.decimal "timestamp"
    t.string "market_symbol"
    t.decimal "volume"
    t.decimal "base_volume"
    t.decimal "quote_volume"
    t.decimal "percent_change"
    t.jsonb "original_payload", default: "{}", null: false
    t.bigint "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["original_payload"], name: "index_tickers_on_original_payload", using: :gin
    t.index ["pair_id"], name: "index_tickers_on_pair_id"
  end

  create_table "trade_histories", force: :cascade do |t|
    t.bigint "pair_id"
    t.string "order_type"
    t.decimal "amount"
    t.decimal "price"
    t.decimal "total"
    t.decimal "event_timestamp"
    t.string "fill_type"
    t.jsonb "original_payload", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["original_payload"], name: "index_trade_histories_on_original_payload", using: :gin
    t.index ["pair_id"], name: "index_trade_histories_on_pair_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "alarms", "asset_infos"
  add_foreign_key "alarms", "users"
  add_foreign_key "assets", "exchanges"
  add_foreign_key "order_books", "pairs"
  add_foreign_key "pairs", "exchanges"
  add_foreign_key "pairs", "markets"
  add_foreign_key "portfolio_assets", "asset_infos"
  add_foreign_key "portfolio_assets", "portfolios"
  add_foreign_key "portfolios", "users"
  add_foreign_key "reports", "markets"
  add_foreign_key "tickers", "pairs"
  add_foreign_key "trade_histories", "pairs"
end

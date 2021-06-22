
exmo = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'exmo',
  base_url: 'https://api.exmo.com/v1',
  get_assets_path: '/currency/',
  get_pairs_path: '/pair_settings/',
  get_order_book_path: '/order_book?pair=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/ticker',
  get_trade_history_path: '/trades?pair=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
    min_confirmation: "",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "name",
    base_currency: "base_currency",
    quote_currency: "quote_currency",
    min_trade_size: "min_amount",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "ask",
    bids: "bid",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "sell_price",
    bid: "buy_price",
    last: "last_trade",
    base_volume: "",
    volume: "vol",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "updated",
    market_symbol: ""
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "type",
    amount: "quantity",
    price: "price",
    total: "amount",
    fill_type: "",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Exmo Exchange"
puts exmo.inspect
exmo_assets_count = exmo.get_assets
puts ""
puts("Retrieved #{exmo_assets_count} Exmo Assets")
puts ""
exmo_pairs_count = exmo.get_pairs
puts ""
puts("Retrieved #{exmo_pairs_count} Exmo Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

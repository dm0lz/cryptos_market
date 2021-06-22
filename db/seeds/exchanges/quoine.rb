quoine = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'quoine',
  base_url: 'https://api.qryptos.com',
  get_assets_path: '/products',
  get_pairs_path: '/products',
  get_order_book_path: '/products/CURRENCY_PAIR_PARAM/price_levels',
  get_tickers_path: '/products',
  get_trade_history_path: '/executions?product_id=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: false,
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
    quote_currency: "quoted_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "sell_price_levels",
    bids: "buy_price_levels",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "high_market_ask",
    bid: "low_market_bid",
    last: "last_traded_price",
    base_volume: "",
    volume: "volume_24h",
    quote_volume: "",
    percent_change: "",
    high: "high_market_ask",
    low: "low_market_bid",
    timestamp: "timestamp",
    market_symbol: "currency_pair_code"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "taker_side",
    amount: "quantity",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "created_at"
  }.with_indifferent_access
)
puts "Created Quoine Exchange"
puts quoine.inspect
quoine_assets_count = quoine.get_assets
puts ""
puts("Retrieved #{quoine_assets_count} Quoine Assets")
puts ""
quoine_pairs_count = quoine.get_pairs
puts ""
puts("Retrieved #{quoine_pairs_count} Quoine Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

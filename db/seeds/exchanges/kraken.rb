
kraken = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'kraken',
  base_url: 'https://api.kraken.com',
  get_assets_path: '/0/public/Assets',
  get_pairs_path: '/0/public/AssetPairs',
  get_order_book_path: '/0/public/Depth?pair=CURRENCY_PAIR_PARAM',
  get_ticker_path: '/0/public/Ticker?pair=CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/0/public/Trades?pair=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "name",
    iso_4217: "altname",
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
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: ""
  }.with_indifferent_access,
  ticker_data_map: {
    ask: "ask",
    bid: "bid",
    last: "last",
    base_volume: "",
    volume: "volume",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "order_type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "event_timestamp"
  }.with_indifferent_access
)
puts "Created Kraken Exchange"
puts kraken.inspect
kraken_assets_count = kraken.get_assets
puts ""
puts("Retrieved #{kraken_assets_count} Kraken Assets")
puts ""
kraken_pairs_count = kraken.get_pairs
puts ""
puts("Retrieved #{kraken_pairs_count} Kraken Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"
puts ""
puts ""
puts "Cleaning Kraken Pairs..."
Cleaner.kraken

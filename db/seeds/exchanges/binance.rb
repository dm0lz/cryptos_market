

binance = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'binance',
  base_url: 'https://api.binance.com',
  get_assets_path: '/api/v1/exchangeInfo',
  get_pairs_path: '/api/v1/exchangeInfo',
  get_order_book_path: '/api/v1/depth?symbol=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/api/v1/ticker/24hr',
  get_trade_history_path: '/api/v1/aggTrades?symbol=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "symbol",
    iso_4217: "baseAsset",
    min_confirmation: "",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "symbol",
    base_currency: "baseAsset",
    quote_currency: "quoteAsset",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "askPrice",
    bid: "bidPrice",
    last: "lastPrice",
    base_volume: "",
    volume: "volume",
    quote_volume: "quoteVolume",
    percent_change: "priceChangePercent",
    high: "highPrice",
    low: "lowPrice",
    timestamp: "closeTime",
    market_symbol: "symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "",
    amount: "",
    price: "",
    total: "",
    fill_type: "",
    event_timestamp: ""
  }.with_indifferent_access
)
puts "Created Binance Exchange"
puts binance.inspect
binance_assets_count = binance.get_assets
puts ""
puts("Retrieved #{binance_assets_count} Binance Assets")
puts ""
binance_pairs_count = binance.get_pairs
puts ""
puts("Retrieved #{binance_pairs_count} Binance Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

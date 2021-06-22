
hibtc = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'hibtc',
  base_url: 'https://api.hitbtc.com/api/2',
  get_assets_path: '/public/currency',
  get_pairs_path: '/public/symbol',
  get_order_book_path: '/public/orderbook/CURRENCY_PAIR_PARAM',
  get_tickers_path: '/public/ticker',
  get_trade_history_path: '/public/trades/CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "id",
    iso_4217: "id",
    min_confirmation: "payinConfirmations",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "id",
    base_currency: "baseCurrency",
    quote_currency: "quoteCurrency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "ask",
    bids: "bid",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "ask",
    bid: "bid",
    last: "last",
    base_volume: "volume",
    volume: "",
    quote_volume: "volumeQuote",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "c_timestamp",
    market_symbol: "symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "side",
    amount: "quantity",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "timestamp"
  }.with_indifferent_access
)
puts "Created HiBtc Exchange"
puts hibtc.inspect
hibtc_assets_count = hibtc.get_assets
puts ""
puts("Retrieved #{hibtc_assets_count} HiBtc Assets")
puts ""
hibtc_pairs_count = hibtc.get_pairs
puts ""
puts("Retrieved #{hibtc_pairs_count} HiBtc Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

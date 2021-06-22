
gate = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'gate',
  base_url: 'http://data.gate.io/api2/1',
  get_assets_path: '/pairs',
  get_pairs_path: '/marketinfo',
  get_order_book_path: '/orderBook/CURRENCY_PAIR_PARAM',
  get_tickers_path: '/tickers',
  get_trade_history_path: '/trade/CURRENCY_PAIR_PARAM',
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
    asks: "asks",
    bids: "bids",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "lowestAsk",
    bid: "highestBid",
    last: "last",
    base_volume: "baseVolume",
    volume: "baseVolume",
    quote_volume: "quoteVolume",
    percent_change: "percentChange",
    high: "high24hr",
    low: "low24hr",
    timestamp: "",
    market_symbol: ""
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "type",
    amount: "amount",
    price: "rate",
    total: "total",
    fill_type: "",
    event_timestamp: "timestamp"
  }.with_indifferent_access
)
puts "Created Gate Exchange"
puts gate.inspect
gate_assets_count = gate.get_assets
puts ""
puts("Retrieved #{gate_assets_count} Gate Assets")
puts ""
gate_pairs_count = gate.get_pairs
puts ""
puts("Retrieved #{gate_pairs_count} Gate Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

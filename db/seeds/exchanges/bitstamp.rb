

bitstamp = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'bitstamp',
  base_url: 'https://bitstamp.net',
  get_assets_path: '/api/v2/trading-pairs-info/',
  get_pairs_path: '/api/v2/trading-pairs-info/',
  get_order_book_path: '/api/v2/order_book/CURRENCY_PAIR_PARAM/',
  get_ticker_path: '/api/v2/ticker/CURRENCY_PAIR_PARAM/',
  get_trade_history_path: '/api/v2/transactions/CURRENCY_PAIR_PARAM/',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
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
    quote_currency: "quote_currency",
    min_trade_size: "minimum_order",
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
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bitstamp Exchange"
puts bitstamp.inspect
bitstamp_assets_count = bitstamp.get_assets
puts ""
puts("Retrieved #{bitstamp_assets_count} Bitstamp Assets")
puts ""
bitstamp_pairs_count = bitstamp.get_pairs
puts ""
puts("Retrieved #{bitstamp_pairs_count} Bitstamp Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

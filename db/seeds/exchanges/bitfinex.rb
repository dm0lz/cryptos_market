
bitfinex = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'bitfinex',
  base_url: 'https://api.bitfinex.com',
  get_assets_path: '/v1/symbols',
  get_pairs_path: '/v1/symbols_details',
  get_order_book_path: '/v1/book/CURRENCY_PAIR_PARAM', #limit_bids && limit_asks does not work...
  get_ticker_path: '/v1/pubticker/CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/v1/trades/CURRENCY_PAIR_PARAM?limit_trades=50',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
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
    min_trade_size: "minimum_order_size",
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
    last: "last_price",
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
    order_type: "type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bitfinex Exchange"
puts bitfinex.inspect
bitfinex_assets_count = bitfinex.get_assets
puts ""
puts("Retrieved #{bitfinex_assets_count} Bitfinex Assets")
puts ""
bitfinex_pairs_count = bitfinex.get_pairs
puts ""
puts("Retrieved #{bitfinex_pairs_count} Bitfinex Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

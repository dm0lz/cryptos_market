
etherdelta = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'etherdelta',
  base_url: 'https://api.etherdelta.com',
  get_assets_path: '/returnTicker',
  get_pairs_path: '/returnTicker',
  get_order_book_path: '/order_book?pair=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/returnTicker',
  get_trade_history_path: '/trades?pair=CURRENCY_PAIR_PARAM',
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
    quote_currency: "quote_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "",
    bids: "",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "ask",
    bid: "bid",
    last: "last",
    base_volume: "baseVolume",
    volume: "volume",
    quote_volume: "quoteVolume",
    percent_change: "percentChange",
    high: "",
    low: "",
    timestamp: "",
    market_symbol: ""
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
puts "Created EtherDelta Exchange"
puts etherdelta.inspect
etherdelta_assets_count = etherdelta.get_assets
puts ""
puts("Retrieved #{etherdelta_assets_count} EtherDelta Assets")
puts ""
etherdelta_pairs_count = etherdelta.get_pairs
puts ""
puts("Retrieved #{etherdelta_pairs_count} EtherDelta Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

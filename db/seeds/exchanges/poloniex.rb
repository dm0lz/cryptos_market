
poloniex = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'poloniex',
  base_url: 'https://poloniex.com',
  get_assets_path: '/public?command=returnCurrencies',
  get_pairs_path: '/public?command=returnTicker',
  get_order_book_path: '/public?command=returnOrderBook&currencyPair=CURRENCY_PAIR_PARAM&depth=10',
  get_tickers_path: '/public?command=returnTicker',
  get_trade_history_path: '/public?command=returnTradeHistory&currencyPair=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
    min_confirmation: "minConf",
    tx_fee: "txFee",
    is_active: "",
    coin_type: "",
    is_frozen: "frozen",
    is_delisted: "delisted",
    is_disabled: "disabled"
  }.with_indifferent_access,
  pair_data_map: {
    name: "name",
    base_currency: "base_currency",
    quote_currency: "quote_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: "is_frozen"
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: "isFrozen"
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
    event_timestamp: "event_timestamp"
  }.with_indifferent_access
)
puts "Created Poloniex Exchange"
puts poloniex.inspect
poloniex_assets_count = poloniex.get_assets
puts ""
puts("Retrieved #{poloniex_assets_count} Poloniex Assets")
puts ""
poloniex_pairs_count = poloniex.get_pairs
puts ""
puts("Retrieved #{poloniex_pairs_count} Poloniex Currency Pairs")
puts ""

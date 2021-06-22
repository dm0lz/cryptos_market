
kucoin = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'kucoin',
  base_url: 'https://api.kucoin.com/v1',
  get_assets_path: '/market/open/symbols',
  get_pairs_path: '/market/open/symbols',
  get_order_book_path: '/open/orders?symbol=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/market/open/symbols',
  get_trade_history_path: '/open/trade_history?symbol=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "coinType",
    iso_4217: "coinType",
    min_confirmation: "",
    tx_fee: "feeRate",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "symbol",
    base_currency: "coinType",
    quote_currency: "coinTypePair",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "SELL",
    bids: "ASK",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "sell",
    bid: "buy",
    last: "lastDealPrice",
    base_volume: "volValue",
    volume: "vol",
    quote_volume: "vol",
    percent_change: "change",
    high: "high",
    low: "low",
    timestamp: "datetime",
    market_symbol: "symbol"
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
puts "Created Kucoin Exchange"
puts kucoin.inspect
kucoin_assets_count = kucoin.get_assets
puts ""
puts("Retrieved #{kucoin_assets_count} Kucoin Assets")
puts ""
kucoin_pairs_count = kucoin.get_pairs
puts ""
puts("Retrieved #{kucoin_pairs_count} Kucoin Currency Pairs")
puts ""



# require Rails.root + 'db/seeds/exchanges/kucoin.rb'

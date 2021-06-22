
liqui = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'liqui',
  base_url: 'https://api.liqui.io/api/3',
  get_assets_path: '/info',
  get_pairs_path: '/info',
  get_order_book_path: '/depth/CURRENCY_PAIR_PARAM',
  get_ticker_path: '/ticker/CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/trades/CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
    min_confirmation: "",
    tx_fee: "fee",
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
  ticker_data_map: {
    ask: "sell",
    bid: "buy",
    last: "last",
    base_volume: "",
    volume: "vol",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "",
    market_symbol: ""
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "timestamp"
  }.with_indifferent_access
)
puts "Created Liqui Exchange"
puts liqui.inspect
liqui_assets_count = liqui.get_assets
puts ""
puts("Retrieved #{liqui_assets_count} Liqui Assets")
puts ""
liqui_pairs_count = liqui.get_pairs
puts ""
puts("Retrieved #{liqui_pairs_count} Liqui Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

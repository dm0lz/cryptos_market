coinexchange = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'coinexchange',
  base_url: 'https://www.coinexchange.io/api/v1',
  get_assets_path: '/getcurrencies',
  get_pairs_path: '/getmarkets',
  get_order_book_path: '/getorderbook?market_id=CURRENCY_PAIR_PARAM',
  #get_ticker_path: '/getmarketsummary?market_id=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/getmarketsummaries',
  get_trade_history_path: '',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "Name",
    iso_4217: "TickerCode",
    min_confirmation: "",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "MarketID",
    base_currency: "BaseCurrencyCode",
    quote_currency: "MarketAssetCode",
    min_trade_size: "",
    is_active: "Active",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "SellOrders",
    bids: "BuyOrders",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "AskPrice",
    bid: "BidPrice",
    last: "LastPrice",
    base_volume: "",
    volume: "Volume",
    quote_volume: "",
    percent_change: "Change",
    high: "HighPrice",
    low: "LowPrice",
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
puts "Created CoinExchange Exchange"
puts coinexchange.inspect
coinexchange_assets_count = coinexchange.get_assets
puts ""
puts("Retrieved #{coinexchange_assets_count} CoinExchange Assets")
puts ""
coinexchange_pairs_count = coinexchange.get_pairs
puts ""
puts("Retrieved #{coinexchange_pairs_count} CoinExchange Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

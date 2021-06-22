
bleutrade = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'bleutrade',
  base_url: 'https://bleutrade.com/api/v2',
  get_assets_path: '/public/getcurrencies',
  get_pairs_path: '/public/getmarkets',
  get_order_book_path: '/public/getorderbook?market=CURRENCY_PAIR_PARAM&type=all',
  #get_ticker_path: '/public/getticker?market=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/public/getmarketsummaries',
  get_trade_history_path: '/public/getmarkethistory?market=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "CurrencyLong",
    iso_4217: "Currency",
    min_confirmation: "MinConfirmation",
    tx_fee: "TxFee",
    is_active: "IsActive",
    coin_type: "CoinType",
    is_frozen: "",
    is_delisted: "",
    is_disabled: "MaintenanceMode"
  }.with_indifferent_access,
  pair_data_map: {
    name: "MarketName",
    base_currency: "BaseCurrency",
    quote_currency: "MarketCurrency",
    min_trade_size: "MinTradeSize",
    is_active: "IsActive",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "sell",
    bids: "buy",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "Ask",
    bid: "Bid",
    last: "Last",
    base_volume: "BaseVolume",
    volume: "Volume",
    quote_volume: "",
    percent_change: "",
    high: "High",
    low: "Low",
    timestamp: "TimeStamp",
    market_symbol: "MarketName"
  }.with_indifferent_access,
  # ticker_data_map: {
  #   ask: "Ask",
  #   bid: "Bid",
  #   last: "Last",
  #   base_volume: "",
  #   volume: "",
  #   quote_volume: "",
  #   percent_change: "",
  #   high: "",
  #   low: "",
  #   timestamp: "",
  #   market_symbol: ""
  # }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "OrderType",
    amount: "Quantity",
    price: "Price",
    total: "Total",
    fill_type: "",
    event_timestamp: "TimeStamp"
  }.with_indifferent_access
)
puts "Created BleuTrade Exchange"
puts bleutrade.inspect
bleutrade_assets_count = bleutrade.get_assets
puts ""
puts("Retrieved #{bleutrade_assets_count} BleuTrade Assets")
puts ""
bleutrade_pairs_count = bleutrade.get_pairs
puts ""
puts("Retrieved #{bleutrade_pairs_count} BleuTrade Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

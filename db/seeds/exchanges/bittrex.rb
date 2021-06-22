
bittrex = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'bittrex',
  base_url: 'https://bittrex.com',
  get_assets_path: '/api/v1.1/public/getcurrencies',
  get_pairs_path: '/api/v1.1/public/getmarkets',
  get_order_book_path: '/api/v1.1/public/getorderbook?market=CURRENCY_PAIR_PARAM&type=both', # Cannot specify depth with BitTrex
  #get_ticker_path: '/api/v1.1/public/getticker?market=CURRENCY_PAIR_PARAM',
  get_tickers_path: '/api/v1.1/public/getmarketsummaries',
  get_trade_history_path: '/api/v1.1/public/getmarkethistory?market=CURRENCY_PAIR_PARAM',
  has_assets_endpoint: true,
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  asset_data_map: {
    name: "CurrencyLong",
    iso_4217: "Currency",
    min_confirmation: "MinConfirmation",
    tx_fee: "TxFee",
    is_active: "IsActive",
    coin_type: "CoinType",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
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
  trade_history_data_map: {
    order_type: "OrderType",
    amount: "Quantity",
    price: "Price",
    total: "Total",
    fill_type: "FillType",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bittrex Exchange"
puts bittrex.inspect
bittrex_assets_count = bittrex.get_assets
puts ""
puts("Retrieved #{bittrex_assets_count} Bittrex Assets")
puts ""
bittrex_pairs_count = bittrex.get_pairs
puts ""
puts("Retrieved #{bittrex_pairs_count} Bittrex Currency Pairs")
puts ""

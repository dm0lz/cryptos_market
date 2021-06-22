
cryptopia = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'cryptopia',
  base_url: 'https://www.cryptopia.co.nz/api',
  get_assets_path: '/GetCurrencies',
  get_pairs_path: '/GetTradePairs',
  get_order_book_path: '/GetMarketOrders/CURRENCY_PAIR_PARAM',
  get_tickers_path: '/GetMarkets',
  get_trade_history_path: '/GetMarketHistory/CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "Name",
    iso_4217: "Symbol",
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
    base_currency: "Symbol",
    quote_currency: "BaseSymbol",
    min_trade_size: "MinimumTrade",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "Sell",
    bids: "Buy",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "AskPrice",
    bid: "BidPrice",
    last: "LastPrice",
    base_volume: "SellVolume",
    volume: "Volume",
    quote_volume: "BuyVolume",
    percent_change: "Change",
    high: "High",
    low: "Low",
    timestamp: "",
    market_symbol: "Label"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "Type",
    amount: "Amount",
    price: "Price",
    total: "Total",
    fill_type: "",
    event_timestamp: "Timestamp"
  }.with_indifferent_access
)
puts "Created Cryptopia Exchange"
puts cryptopia.inspect
cryptopia_assets_count = cryptopia.get_assets
puts ""
puts("Retrieved #{cryptopia_assets_count} Cryptopia Assets")
puts ""
cryptopia_pairs_count = cryptopia.get_pairs
puts ""
puts("Retrieved #{cryptopia_pairs_count} Cryptopia Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

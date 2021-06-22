
southxchange = Exchange.create!(
  country: "Japan",
  get_user_pair_path: "https://exmo.com/en/trade#?pair=BASE_CURRENCY_PARAM_QUOTE_CURRENCY_PARAM",
  name: 'southxchange',
  base_url: 'https://www.southxchange.com/api',
  get_assets_path: '/markets',
  get_pairs_path: '/markets',
  get_order_book_path: '/book/CURRENCY_PAIR_PARAM', #CURRENCY_PAIR_PARAM = {listingCurrencyCode}/{referenceCurrencyCode}
  get_tickers_path: '/prices',
  get_trade_history_path: '/trades/CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
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
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: ""
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "Ask",
    bid: "Bid",
    last: "Last",
    base_volume: "",
    volume: "Volume24Hr",
    quote_volume: "",
    percent_change: "Variation24Hr",
    high: "",
    low: "",
    timestamp: "",
    market_symbol: "Market"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "Type",
    amount: "Amount",
    price: "Price",
    total: "",
    fill_type: "",
    event_timestamp: "At"
  }.with_indifferent_access
)
puts "Created Southxchange Exchange"
puts southxchange.inspect
southxchange_assets_count = southxchange.get_assets
puts ""
puts("Retrieved #{southxchange_assets_count} Southxchange Assets")
puts ""
southxchange_pairs_count = southxchange.get_pairs
puts ""
puts("Retrieved #{southxchange_pairs_count} Southxchange Currency Pairs")
puts ""



# require Rails.root + 'db/seeds/exchanges/southxchange.rb'

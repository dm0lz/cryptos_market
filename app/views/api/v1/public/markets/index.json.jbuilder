json.markets @markets do |market|
  json.id market.id
  json.name market.name
  json.base_currency market.base_currency
  json.quote_currency market.quote_currency
  json.base_currency_logo market.base_currency_logo.url(:thumb)
  json.quote_currency_logo market.quote_currency_logo.url(:thumb)
  json.market_spread market.spread
  json.pairs market.pairs.watched.with_last_ticker do |pair| #.with_recent_ticker
    json.id pair.id
    json.exchange_name pair.exchange.name
    json.exchange_get_user_pair_path pair.get_user_pair_path
    json.last_to_be_updated false
    json.last_ticker do
      json.id pair.last_ticker.id
      json.market_name market.name
      json.ask pair.last_ticker.ask
      json.bid pair.last_ticker.bid
      json.last pair.last_ticker.last
      json.percent_change pair.last_ticker.percent_change
      json.volume pair.last_ticker.volume
    end
  end
end
json.markets_stats do
  json.watched_markets_count @watched_markets_count
  #json.total_markets_count @total_markets_count
end

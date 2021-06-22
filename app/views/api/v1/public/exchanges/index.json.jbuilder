json.exchanges @exchanges do |exchange|
  json.id exchange.id
  json.name exchange.name.upcase
  json.country exchange.country ? exchange.country.upcase : 'Unknown'
  json.base_url exchange.base_url
  json.markets_nb exchange.pairs.count
  json.watched_markets_nb exchange.pairs.watched.count
  json.last_ticker_request exchange.last_ticker_request.strftime("%a, %B %d %Y %H:%M")
end

json.asset_info do
  json.id @asset_info.id
  json.name @asset_info.name
  json.symbol @asset_info.symbol
  json.price_usd @asset_info.price_usd
  json.volume_24h @asset_info.volume_usd_24h
  json.market_cap @asset_info.market_cap_usd
  json.available_supply @asset_info.available_supply
  json.total_supply @asset_info.total_supply
  json.max_supply @asset_info.max_supply
  json.percent_change_1h @asset_info.percent_change_1h
  json.percent_change_24h @asset_info.percent_change_24h
  json.percent_change_7d @asset_info.percent_change_7d
  json.description @asset_info.description
end

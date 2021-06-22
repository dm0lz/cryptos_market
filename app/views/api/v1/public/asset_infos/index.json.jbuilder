json.assets_infos @assets_infos do |asset|
  json.id asset.id
  json.logo_path_thumb asset.logo.url(:thumb)
  json.original_id asset.original_id
  json.rank asset.rank
  json.name asset.name
  json.symbol asset.symbol
  json.price_usd asset.price_usd
  json.price_btc asset.price_btc
  json.max_supply asset.max_supply
  json.total_supply asset.total_supply
  json.volume_usd_24h asset.volume_usd_24h
  json.market_cap_usd asset.market_cap_usd
  json.available_supply asset.available_supply
  json.percent_change_1h asset.percent_change_1h.round(2) rescue 0
  json.percent_change_7d asset.percent_change_7d.round(2) rescue 0
  json.percent_change_24h asset.percent_change_24h.round(2) rescue 0
  json.last_updated asset.last_updated
end
json.assets_stats do
  json.watched_assets_count @watched_assets_count
end

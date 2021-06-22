json.id @portfolio_asset.id
json.symbol @portfolio_asset.symbol
json.amount @portfolio_asset.amount

json.asset_info do
  json.id @portfolio_asset.asset_info.id
  json.logo_path_thumb @portfolio_asset.asset_info.logo.url(:thumb)
  json.original_id @portfolio_asset.asset_info.original_id
  json.rank @portfolio_asset.asset_info.rank
  json.name @portfolio_asset.asset_info.name
  json.symbol @portfolio_asset.asset_info.symbol
  json.price_usd @portfolio_asset.asset_info.price_usd
  json.price_btc @portfolio_asset.asset_info.price_btc
  json.max_supply @portfolio_asset.asset_info.max_supply
  json.total_supply @portfolio_asset.asset_info.total_supply
  json.volume_usd_24h @portfolio_asset.asset_info.volume_usd_24h
  json.market_cap_usd @portfolio_asset.asset_info.market_cap_usd
  json.available_supply @portfolio_asset.asset_info.available_supply
  json.percent_change_1h @portfolio_asset.asset_info.percent_change_1h
  json.percent_change_7d @portfolio_asset.asset_info.percent_change_7d
  json.percent_change_24h @portfolio_asset.asset_info.percent_change_24h
  json.last_updated @portfolio_asset.asset_info.last_updated
end

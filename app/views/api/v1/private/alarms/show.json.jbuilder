json.alarm do
  json.id @alarm.id
  json.asset_info_id @alarm.asset_info_id
  json.asset_symbol @alarm.asset_info.symbol
  json.min_limit @alarm.min_limit
  json.max_limit @alarm.max_limit
  json.created_at @alarm.created_at.strftime("%a, %B %d %Y %H:%M")
  json.is_active @alarm.is_active
  json.has_min_limit @alarm.has_min_limit
  json.has_max_limit  @alarm.has_max_limit
end

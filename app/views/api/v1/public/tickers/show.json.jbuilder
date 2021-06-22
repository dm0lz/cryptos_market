json.id @ticker.id
json.ask @ticker.ask
json.bid @ticker.bid
json.last @ticker.last
json.percent_change @ticker.percent_change
json.volume @ticker.volume ? @ticker.volume : @ticker.base_volume
json.pair_id @ticker.pair.id
json.market_id @ticker.pair.market.id
json.market_name @ticker.pair.market.name

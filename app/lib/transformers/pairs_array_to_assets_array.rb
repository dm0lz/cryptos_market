class Transformers::PairsArrayToAssetsArray

  # Used for Bitfiniex
  # It receives an array of pairs and returns an array of assets
  # ex: ["BTCLTC", "BTCUSD"] => ["BTC", "LTC", "USD"]
  # Todo: TestIt !

  def initialize payload
    @pairs_array = payload
  end

  def run
    assets_array = []

    @pairs_array.each do |asset_pair|
      existing_asset = assets_array.include? asset_pair[0..2]
      unless existing_asset
        asset = {
          name: asset_pair[0..2],
          iso_4217: asset_pair[0..2].upcase
        }.with_indifferent_access
        assets_array << asset
      end
    end

    @pairs_array.each do |asset_pair|
      existing_asset = assets_array.include? asset_pair[3..5]
      unless existing_asset
        asset = {
          name: asset_pair[3..5],
          iso_4217: asset_pair[3..5].upcase
        }.with_indifferent_access
        assets_array << asset
      end
    end

    assets_array
  end
end

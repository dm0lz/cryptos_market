class Transformers::PairsArrayToAssetsArrayV3

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
      existing_asset = assets_array.include? asset_pair.split('_').first
      unless existing_asset
        asset = {
          name: asset_pair.split('_').first,
          iso_4217: asset_pair.split('_').first.upcase
        }.with_indifferent_access
        assets_array << asset
      end
    end

    @pairs_array.each do |asset_pair|
      existing_asset = assets_array.include? asset_pair.split('_').last
      unless existing_asset
        asset = {
          name: asset_pair.split('_').last,
          iso_4217: asset_pair.split('_').last.upcase
        }.with_indifferent_access
        assets_array << asset
      end
    end

    assets_array
  end
end

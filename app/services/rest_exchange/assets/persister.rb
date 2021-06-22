class RestExchange::Assets::Persister

  def initialize exchange, assets_array
    @exchange = exchange
    @assets_array = assets_array
  end

  def call
    @assets_array.each do |asset_payload|
      existing_asset = @exchange.assets.find_by(iso_4217: asset_payload[mapping[:iso_4217]])
      unless existing_asset
        asset = Asset.new(
          name: asset_payload[mapping[:name]],
          iso_4217: asset_payload[mapping[:iso_4217]],
          min_confirmation: asset_payload[mapping[:min_confirmation]],
          tx_fee: asset_payload[mapping[:tx_fee]],
          coin_type: asset_payload[mapping[:coin_type]],
          is_active: asset_payload[mapping[:is_active]],
          is_disabled: asset_payload[mapping[:is_disabled]],
          is_delisted: asset_payload[mapping[:is_delisted]],
          is_frozen: asset_payload[mapping[:is_frozen]],
          original_payload: asset_payload[:original_payload],
          exchange_id: @exchange.id
        )
        asset.save!
      end
    end
    return @exchange.assets.count
  end

  private
  def mapping
    @exchange.asset_data_map.with_indifferent_access
  end

end

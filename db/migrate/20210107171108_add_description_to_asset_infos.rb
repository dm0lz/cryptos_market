class AddDescriptionToAssetInfos < ActiveRecord::Migration[5.1]
  def change
    add_column :asset_infos, :description, :text
  end
end

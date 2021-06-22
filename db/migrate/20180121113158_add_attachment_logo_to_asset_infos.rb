class AddAttachmentLogoToAssetInfos < ActiveRecord::Migration[5.1]
  def self.up
    change_table :asset_infos do |t|
      t.attachment :logo
    end
  end

  def self.down
    remove_attachment :asset_infos, :logo
  end
end

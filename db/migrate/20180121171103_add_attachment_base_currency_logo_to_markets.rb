class AddAttachmentBaseCurrencyLogoToMarkets < ActiveRecord::Migration[5.1]
  def self.up
    change_table :markets do |t|
      t.attachment :base_currency_logo
    end
  end

  def self.down
    remove_attachment :markets, :base_currency_logo
  end
end

class AddAttachmentQuoteCurrencyLogoToMarkets < ActiveRecord::Migration[5.1]
  def self.up
    change_table :markets do |t|
      t.attachment :quote_currency_logo
    end
  end

  def self.down
    remove_attachment :markets, :quote_currency_logo
  end
end

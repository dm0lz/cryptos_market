class AddCountryToExchanges < ActiveRecord::Migration[5.1]
  def change
    add_column :exchanges, :country, :string
  end
end

class AddIsFetchingTickersToExchanges < ActiveRecord::Migration[5.1]
  def change
    add_column :exchanges, :is_fetching_tickers, :boolean, default: false
  end
end

class AddGetUserPairPathToExchanges < ActiveRecord::Migration[5.1]
  def change
    add_column :exchanges, :get_user_pair_path, :string
  end
end

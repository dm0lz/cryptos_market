class AddSpreadToReports < ActiveRecord::Migration[5.1]
  def change
    add_column :reports, :spread, :decimal
  end
end

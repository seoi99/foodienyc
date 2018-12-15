class ChangeOpenCloseToBeStringInHours < ActiveRecord::Migration[5.2]
  def change
    change_column :hours, :open, :string
    change_column :hours, :close, :string
  end
end

class AddIndexToBusinessName < ActiveRecord::Migration[5.2]
  def change
    add_index :businesses, :business_name
    add_index :businesses, :category
  end
end

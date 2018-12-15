class CreateBusinesses < ActiveRecord::Migration[5.2]
  def change
    create_table :businesses do |t|
      t.string :business_name
      t.string :full_address
      t.float :latitude
      t.float :longitude
      t.string :phone_number
      t.string :website
      t.string :category

      t.timestamps
    end
  end
end

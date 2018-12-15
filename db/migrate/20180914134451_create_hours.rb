class CreateHours < ActiveRecord::Migration[5.2]
  def change
    create_table :hours do |t|
      t.integer :business_id
      t.string :day
      t.time :open
      t.time :close

      t.timestamps
    end
  end
end

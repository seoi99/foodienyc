class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :session_token
      t.string :firstname
      t.string :lastname
      t.integer :zipcode
      t.integer :date
      t.string :month
      t.integer :year

      t.timestamps
    end
  end
end

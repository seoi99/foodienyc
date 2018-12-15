class CreateYelpApiBusiness < ActiveRecord::Migration[5.2]
  def change
    create_table :yelp_api_businesses do |t|
      t.json :yelp_businesses
      t.timestamps
    end
  end
end

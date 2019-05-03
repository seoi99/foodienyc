class DropYelpFusionApiTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :yelp_api_businesses
  end
end

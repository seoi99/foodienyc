# == Schema Information
#
# Table name: yelp_api_businesses
#
#  id              :bigint(8)        not null, primary key
#  yelp_businesses :json
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class YelpApiBusiness < ApplicationRecord
  validates :yelp_businesses, presence: true
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"
  SEARCH_LIMIT = 20
  API_KEY = Rails.application.credentials.yelp_api


  def business(id)
    url = "#{API_HOST}#{BUSINESS_PATH}#{id}"
    result = HTTP.auth("Bearer #{API_KEY}").get(url)
    result.parse
  end

  def search(term, location)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: term,
      location: location,
      limit: SEARCH_LIMIT
    }
    response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
    self.yelp_businesses = response.parse["businesses"]
    self.yelp_businesses.each do |biz|
      b = Business.new()
      b.business_name = biz["name"]
      b.full_address = biz["location"]["display_address"].join(" ")
      b.phone_number = biz["display_phone"]
      b.category = biz["categories"].map{ |el| el["alias"]}.join(", ")
      b.latitude = biz["coordinates"]["latitude"]
      b.longitude = biz["coordinates"]["longitude"]
      if biz["price"]
        b.price =  biz["price"].length * 10 + rand(9)
      else
        b.price = rand(20) + 10
      end

      if b.save
        result = business(biz["id"])

        result["photos"].each do |url|
          Image.create!(
            business_id: b.id,
            img_url: url
          )
        end

        if (result["hours"])
          result["hours"][0]["open"].each do |operation|
            Hour.create!(
              business_id: b.id,
              day: Date::DAYNAMES[operation["day"]].upcase[0..2],
              open: operation["start"].insert(2,":"),
              close: operation["end"].insert(2,":")
            )
          end
        end

      end

    end
  end





end

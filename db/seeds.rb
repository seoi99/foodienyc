# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Business.destroy_all
# Hour.destroy_all
# Image.destroy_all
# Review.destroy_all


API_HOST = "https://api.yelp.com"
SEARCH_PATH = "/v3/businesses/search"
BUSINESS_PATH = "/v3/businesses/"
SEARCH_LIMIT = 1
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
  businesses = response.parse["businesses"]
    businesses.each do |biz|
      b = Business.new()
      b.id = biz["id"]
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
        if (result["photos"])
          result["photos"].each do |url|
            Image.create!(
              business_id: b.id,
              img_url: url
            )
          end
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
      else
        puts "API connection failed"
      end
    end
  end



search('cafe', 'virginia')

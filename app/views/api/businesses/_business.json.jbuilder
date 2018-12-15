json.extract! business,:id, :business_name, :full_address, :latitude, :longitude, :category, :phone_number, :website, :average_rating, :price
json.reviewIds do
  json.array! business.reviews.pluck(:id)
end

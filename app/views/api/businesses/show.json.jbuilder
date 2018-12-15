  json.partial! '/api/businesses/business', business: @business
  json.hours do
    json.array! @business.hours.each do |hour|
      json.extract! hour, :id, :day, :open, :close, :business_id
    end
  end
  json.images do
    json.array! @business.images.each do |image|
      json.extract! image, :id, :img_url, :business_id
    end
  end

json.reviews do
  @business.reviews.each do |review|
    json.set! review.user_id do
      json.extract! review, :id, :body, :rating, :user_id
      json.extract! review.user, :username, :firstname, :lastname
    end
  end
end

json.businesses do
  @businesses.each do |business|
    json.set! business.id do
      json.partial! 'business', business: business

      json.images do
        json.array! business.images.each do |image|
          json.extract! image, :id, :img_url
        end
      end
      json.hours business.hours, :id, :open, :close, :day
      json.reviews business.reviews, :body
    end
  end
end

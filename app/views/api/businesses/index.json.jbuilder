json.businesses do
  @businesses.each do |business|
    json.set! business.id do
      json.partial! 'business', business: business

      json.images do
        main = business.images[0]
          json.extract! main, :id, :img_url
      end
    end
  end
end

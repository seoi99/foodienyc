json.array! @reviews.each do |review|
    json.partial! '/api/reviews/review', review: review
    json.extract! review.business, :business_name
    json.extract! review.user, :firstname, :lastname
end

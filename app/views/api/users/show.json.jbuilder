@user.reviews do |review|
  json.partial! '/api/reviews/review', review: @review
end

json.partial! "api/users/user", user: @user

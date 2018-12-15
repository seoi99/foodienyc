# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Business.destroy_all
Hour.destroy_all
Image.destroy_all
Review.destroy_all

korean = YelpApiBusiness.new()
korean.search("korean", "new york city")

japanese = YelpApiBusiness.new()
japanese.search("japanese", "new york city")

italian = YelpApiBusiness.new()
italian.search("italian", "new york city")

fastfood = YelpApiBusiness.new()
fastfood.search("fast food", "new york city")

salad = YelpApiBusiness.new()
salad.search("salad", "new york city")

cafe = YelpApiBusiness.new()
cafe.search("cafe", "new york city")

delivery = YelpApiBusiness.new()
delivery.search("delivery", "new york city")

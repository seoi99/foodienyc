# Foodie


[Live!](http://foodienyc.herokuapp.com/#/)


* Foodie is single-page application inspired by Yelp.
It is full-stack application that uses
 Ruby on rails as a backend to store data,
uses JQuery, React, Redux as a frontend framework to interact with user's preferences about Food.

Please feel free to take a look at my website!!


![alt text](https://github.com/seoi99/foodie/blob/master/app/assets/images/main.png)

## Feature

### Search
* User can search restaurant by name / category


![alt text](https://github.com/seoi99/foodie/blob/master/app/assets/images/name.png)



### Google Map API
* Users will be able see marker on the map, and once user click's on marker it will navigate direction.
* creates a marker based on the latitude and longitude of the business
* once it has been received, place marker on current map


![alt text](https://github.com/seoi99/foodie/blob/master/app/assets/images/map.png)


``` javascript
createMarkerFromBusiness(business) {
  const position = new google.maps.LatLng(business.latitude, business.longitude);
  const marker = new google.maps.Marker({
    position,
    map: this.map,
    businessId: business.id
  })
  marker.addListener('click', () => this.handleClick(business));
  this.markers[marker.businessId] = marker;
}
```
* on click, direct user to Google Map that enable users to get directions.

``` javascript
handleMarkerClick(business) {
  const url = `https://www.google.com/maps/place/${business.full_address}`;
  window.open(url);
}
```



### CRUD Functionality

* User can create/edit/delete/update a review.
* user can only create one review per restaurant.
* users can edit and delete their reviews only.
* user will only be able to delete only if he/she is current user.



![alt text](https://github.com/seoi99/foodie/blob/master/app/assets/images/review.png)


``` ruby
def destroy
  @review = Review.find(params[:id])
  @review.destroy
  render :show
end
```




###


export default class MarkerManager {
  constructor(map, handleClick, single, latlng) {
    this.map = map;
    this.handleClick = handleClick;
    this.markers = {};
    this.single = single;
    this.label = 1;
    this.latlng = latlng
  }

  updateMarkers(businesses) {
    let businessesObj = {};
    businesses.forEach((business) => {
      if((Math.abs(this.latlng.lat - business.latitude) <= 0.4) &&
       (Math.abs(this.latlng.lng - business.longitude) <= 0.4)) {
         return businessesObj[business.id] = business
       }
     }
      );

    businesses.filter(business => !this.markers[business.id])
    .forEach(newBusiness => this.createMarkerFromBusiness(newBusiness));

    Object.keys(this.markers).filter(businessId => !businessesObj[businessId])
    .forEach((businessId) => this.removeMarker(this.markers[businessId]));
    this.label = 1;
  }

  createMarkerFromBusiness(business) {
    if (this.single) {
      this.label = 1;
    }
    const position = new google.maps.LatLng(business.latitude, business.longitude);
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      businessId: business.id,
      label: `${this.label}`
    })
    this.label += 1
    marker.addListener('click', () => this.handleClick(business));
    this.markers[marker.businessId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.businessId].setMap(null);
    delete this.markers[marker.businessId];
  }
}

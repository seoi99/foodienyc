
export default class MarkerManager {
  constructor(map, handleClick, single, latlng) {
    this.map = map;
    this.handleClick = handleClick;
    this.markers = {};
    this.single = single;
    this.label = 1;
    this.latlng = latlng;
  }

  updateMarkers(businesses) {
    this.label = 1;
    let businessesObj = {};
    businesses.forEach((business) => {
         businessesObj[business.id] = business
     });
    businesses.filter(business => (!this.markers[business.id]))
    .forEach((newBusiness, i) => this.createMarkerFromBusiness(newBusiness));
    Object.keys(this.markers).filter(businessId => !businessesObj[businessId])
    .forEach((businessId) => this.removeMarker(this.markers[businessId]));
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
      label: this.label.toString(),
    })
    this.label += 1;
    marker.addListener('click', () => this.handleClick(business));
    this.markers[marker.businessId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.businessId].setMap(null);
    delete this.markers[marker.businessId];
  }
}


export default class MarkerManager {
  constructor(map, handleClick, single, latlng) {
    this.map = map;
    this.handleClick = handleClick;
    this.markers = {};
    this.single = single;
    this.latlng = latlng;
  }

  updateMarkers(businesses) {
    let businessesObj = {};
    businesses.forEach((business) => {
         businessesObj[business.id] = business
     });
     Object.keys(this.markers)
     .forEach((businessId) => this.removeMarker(this.markers[businessId]));
    businesses.filter(business => (!this.markers[business.id]))
    .forEach((newBusiness, i) => this.createMarkerFromBusiness(newBusiness, i));

  }

  createMarkerFromBusiness(business, i) {
    if (this.single) {
      this.label = 1;
    }
    const position = new google.maps.LatLng(business.latitude, business.longitude);
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      businessId: business.id,
      label: (i + 1).toString(),
    })
    marker.addListener('click', () => this.handleClick(business));
    this.markers[marker.businessId] = marker;
  }

  removeMarker(marker) {
    this.markers[marker.businessId].setMap(null);
    delete this.markers[marker.businessId];
  }
}

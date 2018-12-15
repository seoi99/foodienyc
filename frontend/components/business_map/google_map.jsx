import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';

import MarkerManager from '../../util/marker_manager';

const getCoordsObj = (latLng) => {
  return {
    lat: latLng.lat(),
    lng: latLng.lng(),
  }
}

const latlng = new google.maps.LatLng(40.754614, -73.987898);
const mapOptions = {
  center: latlng,
  zoom: 11
};


class GoogleMap extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    const map = this.refs.map;
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness);
    if (this.props.singleBusiness) {
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
    } else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
  }

  componentDidUpdate() {

    if (this.props.singleBusiness) {
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
      const targetBusinessKey = Object.keys(this.props.business);
      const targetBusiness = this.props.business;
      this.MarkerManager.updateMarkers([targetBusiness]);
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
    } else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
  }

  handleMarkerClick(business) {
    const url = `https://www.google.com/maps/place/${business.full_address}`;
    window.open(url);
  }



  render() {

    return (
      <div id="map" ref={ map => this.mapNode = map }>
      </div>
    );
  }

}

export default withRouter(GoogleMap);

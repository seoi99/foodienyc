import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses} from '../../actions/business_actions';

import MarkerManager from '../../util/marker_manager';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }

  showPosition(position) {
    this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
   }

  getLocation() {
    if (this.props.location === "current location") {
    if (navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
    }
  }

  componentDidMount() {
    this.getLocation();
    const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
    const mapOptions = {
      center: latlng,
      zoom: 15
    };

    const map = this.refs.map;
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    this.map.zoom = 11;
    if (this.props.singleBusiness) {
      this.props.fetchLocation(this.props.business.full_address);
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
    }
    else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
  }

  inMapBounds(biz) {
      let businesses = biz.filter(b => {
        return (this.map.getBounds().ma.j < b.latitude && this.map.getBounds().ma.l >  b.latitude)
        && (this.map.getBounds().ga.j < b.longitude && this.map.getBounds().ga.l >  b.longitude)
      })
      this.props.receiveUpdates(businesses);
      this.MarkerManager.updateMarkers(businesses);
  }

  batchUpdate() {
      this.map.setCenter(this.props.latlng);
      if (this.map.getBounds()) {
        this.inMapBounds(this.props.businesses);
      }
  }



  singleUpdate() {
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    this.MarkerManager.createMarkerFromBusiness(this.props.business);
    this.map.setCenter(this.props.latlng);
  }
  componentDidUpdate(next) {
    if (this.props.singleBusiness) {
      this.singleUpdate();
    } else {
      this.batchUpdate();
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

const mapStateToProps = (state) => {

  return {
    businesses: Object.values(state.entities.businesses),
    latlng: state.entities.coordinate,
    loading: state.ui.businesses.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocation: (address) => dispatch(fetchLocation(address)),
    loadNoBusinesses: () => dispatch(loadNoBusinesses()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

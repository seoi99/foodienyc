import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';


import MarkerManager from '../../util/marker_manager';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {len : 0}
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
    const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
    const mapOptions = {
      center: latlng,
      zoom: 15
    };
    const map = this.refs.map;


    this.map = new google.maps.Map(this.mapNode, mapOptions);

    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    if (this.props.singleBusiness) {
      this.props.fetchLocation(this.props.business.full_address);
      this.MarkerManager.createMarkerFromBusiness(this.props.business, "1");
    } else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }

  }


  componentDidUpdate(e) {
    this.getLocation();
    if (this.props.singleBusiness) {
      this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
      this.map.setCenter(this.props.latlng);
      this.MarkerManager.createMarkerFromBusiness(this.props.business, "1");
    } else if (this.map.getCenter.lat !== this.props.latlng.lat){
      this.map.setCenter(this.props.latlng);
      this.MarkerManager.updateMarkers(this.props.businesses);
    } else {
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
    latlng: state.entities.coordinate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocation: (address) => dispatch(fetchLocation(address)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses} from '../../actions/business_actions';
import BusinessIndexItem from '../businesses/business_index_item';

import MarkerManager from '../../util/marker_manager';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
  }


   getLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(this.showPosition);
     } else {
       console.log("geolocation is not supported");
     }
   }
   showPosition(position) {
     this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    }

  componentDidUpdate() {
    if (this.props.singleBusiness) {
      this.singleUpdate();
    } else {
        this.batchUpdate();
    }
  }
  componentDidMount() {
    this.getLocation();
    const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
    const mapOptions = {
      center: latlng,
      zoom: 11
    };

    const map = this.refs.map;
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    this.map.zoom = 11;
    if (this.props.singleBusiness) {
      this.props.fetchLocation(this.props.business.full_address);
      this.MarkerManager.createMarkerFromBusiness(this.props.business, 0);
    }
    else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
  }

  batchUpdate() {
    this.map.setCenter(this.props.latlng);
    this.MarkerManager.updateMarkers(this.props.businesses);
  }




  singleUpdate() {
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    this.MarkerManager.createMarkerFromBusiness(this.props.business, 0);
    const newLatlng = {
      lat:this.props.business.latitude,
      lng: this.props.business.longitude
    }
    this.map.setCenter(newLatlng);
  }


  handleMarkerClick(business) {
    const url = `https://www.google.com/maps/place/${business.full_address}`;
    window.open(url);
  }



  render() {
    return (
          <div className="all-map">
            <div id="map" ref={ map => this.mapNode = map }></div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
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

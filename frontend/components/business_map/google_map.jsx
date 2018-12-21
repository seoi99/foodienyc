import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';


import MarkerManager from '../../util/marker_manager';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
  }


  componentDidMount() {
    const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
    const mapOptions = {
      center: latlng,
      zoom: 10
    };
    const map = this.refs.map;
    this.map = new google.maps.Map(this.mapNode, mapOptions);

    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);
    if (this.props.singleBusiness) {
      this.props.fetchLocation(this.props.business.full_address);
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
    } else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }

  }


  componentDidUpdate(e) {
    if (e.latlng !== this.state || this.props.singleBusiness) {
      const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
      const mapOptions = {
        center: latlng,
        zoom: 13
      };
      const map = this.refs.map;
      this.map = new google.maps.Map(this.mapNode, mapOptions);
        this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness, this.props.latlng);


    if (this.props.singleBusiness) {
      this.map.zoom = 15
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
      const targetBusinessKey = Object.keys(this.props.business);
      const targetBusiness = this.props.business;
      this.MarkerManager.updateMarkers([targetBusiness]);
      this.MarkerManager.createMarkerFromBusiness(this.props.business);
    } else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
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

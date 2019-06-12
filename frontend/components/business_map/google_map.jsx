import React from 'react';
import ReactDom from 'react-dom';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses, getSearchResult} from '../../actions/business_actions';
import BusinessIndexItem from '../businesses/business_index_item';

import MarkerManager from '../../util/marker_manager';

class GoogleMap extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      businesses: []
    }
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
      if (this.props.loading) {
        if ((this.map.center.lat() !== this.props.latlng.lat && this.map.center.lng() !== this.props.latlng.lng) ||
      this.checkLength(this.props.businesses) !== this.state.businesses.length) {
          this.batchUpdate();
          this.map.setCenter(this.props.latlng);
        }
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
      this.MarkerManager.createMarkerFromBusiness(this.props.business, 0);
    }
    else {
      this.MarkerManager.updateMarkers(this.props.businesses);
    }
  }
  checkLength(biz) {
    let businesses = biz.filter(b => {
      return (this.map.getBounds().na.j < b.latitude && this.map.getBounds().na.l >  b.latitude)
      && (this.map.getBounds().ga.j < b.longitude && this.map.getBounds().ga.l >  b.longitude)
    })
    console.log(requestAllBusinesses.length, this.state.businesses.length);
    return businesses.length
  }

  inMapBounds(biz) {
      let businesses = biz.filter(b => {
        return (this.map.getBounds().na.j < b.latitude && this.map.getBounds().na.l >  b.latitude)
        && (this.map.getBounds().ga.j < b.longitude && this.map.getBounds().ga.l >  b.longitude)
      })
      this.setState({businesses: businesses})

    this.props.receiveUpdates(businesses);
    this.MarkerManager.updateMarkers(businesses);
  }

  batchUpdate() {
      if (this.map.getBounds()) {
        this.inMapBounds(this.props.businesses);
      }
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
    businesses: Object.values(state.entities.businesses),
    latlng: state.entities.coordinate,
    loading: state.ui.businesses.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLocation: (address) => dispatch(fetchLocation(address)),
    getSearchResult: (query) => dispatch(getSearchResult(query)),
    loadNoBusinesses: () => dispatch(loadNoBusinesses()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

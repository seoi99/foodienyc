import React from 'react';
import { connect } from 'react-redux';
import { fetchLocation } from '../../actions/geolocation_actions';
import MarkerManager from '../../util/marker_manager';

class GoogleMapDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchLocation(this.props.business.full_address)
    const latlng = new google.maps.LatLng(this.props.latlng.lat,this.props.latlng.lng);
    const mapOptions = {
      center: latlng,
      zoom: 15
    };
    const map = this.refs.map;
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    this.MarkerManager = new MarkerManager(this.map, this.handleMarkerClick.bind(this), this.props.singleBusiness);
    this.MarkerManager.createMarkerFromBusiness(this.props.business);
  }

  componentDidUpdate() {
    const mapOptions = {
      center: { lat:this.props.latlng.lat, lng: this.props.latlng.lng },
      zoom: 15
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  handleMarkerClick(business) {
    const url = `https://www.google.com/maps/place/${business.full_address}`;
    window.open(url);
  }


  render() {
    return (
        <div className="map-details-container" ref={ map => this.mapNode = map }>
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapDetails);

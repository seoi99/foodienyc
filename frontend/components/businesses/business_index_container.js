import BusinessIndex from './business_index';
import {connect} from 'react-redux';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses} from '../../actions/business_actions';
import { fetchLocation } from '../../actions/geolocation_actions';

const mapStateToProps = (state) => {
  return {
  businesses: Object.values(state.entities.businesses),
  loading: state.ui.businesses.loading,
  search: state.entities.search,
  latlng: state.entities.coordinate,
}}

const mapDispatchToProps = (dispatch) => {
  return {
  requestAllBusinesses: (businesses) => dispatch(requestAllBusinesses(businesses)),
  loadBusinesses: () => dispatch(loadBusinesses()),
  loadNoBusinesses: () => dispatch(loadNoBusinesses()),
  fetchLocation: (address) => dispatch(fetchLocation(address)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessIndex);

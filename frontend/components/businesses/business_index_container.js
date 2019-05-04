import BusinessIndex from './business_index';
import {connect} from 'react-redux';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses, requestBusiness, removeAllBusinesses} from '../../actions/business_actions';
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
  removeAllBusinesses: () => dispatch(removeAllBusinesses()),
  loadNoBusinesses: () => dispatch(loadNoBusinesses()),
  requestBusiness: (id) => dispatch(requestBusiness(id)),
  fetchLocation: (address) => dispatch(fetchLocation(address)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessIndex);

import BusinessIndex from './business_index';
import {connect} from 'react-redux';
import { requestAllBusinesses , loadBusinesses, loadNoBusinesses} from '../../actions/business_actions';
import { fetchLocation } from '../../actions/geolocation_actions';
import { selectByLocation } from '../../reducers/selector';

const mapStateToProps = (state) => {

  return {
    businesses: selectByLocation(state.entities.search.result, state.entities.coordinate.bounds),
    search_error: state.entities.search.error,
    loading: state.ui.businesses.loading,
    search: state.entities.search,
    latlng: state.entities.coordinate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  requestAllBusinesses: (businesses) => dispatch(requestAllBusinesses(businesses)),
  loadBusinesses: () => dispatch(loadBusinesses()),
  loadNoBusinesses: () => dispatch(loadNoBusinesses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessIndex);

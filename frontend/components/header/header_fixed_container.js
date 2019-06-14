import { connect } from 'react-redux';
import Header from './header_fixed';
import { logout } from '../../actions/session_actions';
import { updateFilter } from '../../actions/filter_actions';
import {requestAllBusinesses, getSearchResult, loadBusinesses, receiveSearchText} from '../../actions/business_actions'
import { selectBusiness } from '../../reducers/selector';
import { requestPhoto} from '../../actions/user_pic_action';
import { fetchLocation, getAutoComplete } from '../../actions/geolocation_actions';


const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    businesses: state.entities.businesses,
    latlng: state.entities.coordinate,
    photo: state.entities.photos[state.session.currentUserId],
    loading: state.ui.businesses.loading,
    text: state.entities.search.text,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getSearchResult: (query, address) => dispatch(getSearchResult(query, address)),
    requestAllBusinesses: () => dispatch(requestAllBusinesses()),
    requestPhoto: (id) => dispatch(requestPhoto(id)),
    loadBusinesses: () => dispatch(loadBusinesses()),
    receiveSearchText: (text) => dispatch(receiveSearchText(text)),
    fetchLocation: (address) => dispatch(fetchLocation(address)),
    getAutoComplete: (address, latlng) => dispatch(getAutoComplete(address, latlng)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

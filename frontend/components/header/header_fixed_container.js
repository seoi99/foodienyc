import { connect } from 'react-redux';
import Header from './header_fixed';
import { logout } from '../../actions/session_actions';
import { updateFilter } from '../../actions/filter_actions';
import {requestAllBusinesses, getSearchResult, loadBusinesses} from '../../actions/business_actions'
import { requestPhoto} from '../../actions/user_pic_action';


const mapStateToProps = state => {

  return {
    currentUser: state.entities.users[state.session.currentUserId],
    businesses: state.entities.businesses,
    photo: state.entities.photos[state.session.currentUserId],
    loading: state.ui.businesses,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    getSearchResult: (query) => dispatch(getSearchResult(query)),
    requestAllBusinesses: () => dispatch(requestAllBusinesses()),
    requestPhoto: (id) => dispatch(requestPhoto(id)),
    loadBusinesses: () => dispatch(loadBusinesses()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

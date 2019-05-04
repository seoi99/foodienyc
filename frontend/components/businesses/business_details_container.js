import BusinessDetails from './business_details';
import {connect} from 'react-redux';
import {requestBusiness, deleteReview, removeAllBusinesses} from '../../actions/business_actions';
import {receiveReviewURI} from '../../actions/session_actions';
import {withRouter} from 'react-router-dom';
import {selectReviewsForBusiness} from '../../reducers/selector';
import { updateFilter } from '../../actions/filter_actions';
import { requestAllPhotos } from '../../actions/user_pic_action';


const mapStateToProps = (state, ownProps) => {
  debugger
  const business = state.entities.businesses[ownProps.match.params.businessId];
  const currentUserId = state.session.currentUserId;
  const businessId  = ownProps.match.params.businessId;
  const user = state.entities.users[currentUserId];
  const errors = state.errors;
  const photos = state.entities.photos;

  return {
  businessId,
  business,
  currentUserId,
  user,
  errors,
  photos,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  reviewClicked: () => {
    dispatch(receiveReviewURI(ownProps))
  },
  requestBusiness: (id) => dispatch(requestBusiness(id)),
  removeAllBusinesses: () => dispatch(removeAllBusinesses()),
  deleteReview: (id) => dispatch(deleteReview(id)),
  requestAllPhotos: () => dispatch(requestAllPhotos()),
  };

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BusinessDetails));

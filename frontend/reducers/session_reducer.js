import merge from 'lodash/merge';
import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER, RECEIVE_REVIEW_URI} from '../actions/session_actions';

const _nullUser = Object.freeze({
  id: null,
  reviewURI: null,
});

const sessionReducer = (state=_nullUser, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    return merge({}, state, {currentUserId: action.currentUser.id});
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    case RECEIVE_REVIEW_URI:
    return merge({}, state, {reviewURI: action.reviewURI});
    default:
      return state;
  }
};

export default sessionReducer;

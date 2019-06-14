import merge from 'lodash/merge';
import {RECEIVE_BUSINESS, RECEIVE_ALL_BUSINESSES, RECEIVE_REVIEW, REMOVE_REVIEW, RECEIVE_SELECTED_BUSINESSES} from '../actions/business_actions';
const initialState = {
  businesses: {}
}
const businessReducer = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_BUSINESS:
      const business = action.business
      return merge({}, state, {[business.id] : action.business})
    case RECEIVE_ALL_BUSINESSES:
      return merge({}, state, action.payload.businesses);

    case RECEIVE_REVIEW:
     const { review, average_rating } = action;
     const newState = merge({}, state);
     newState[review.business_id].average_rating = average_rating;
     newState[review.business_id].reviewIds.push(review.id);
     return newState;
    case REMOVE_REVIEW:
      const { deletereview } = action;
      const deleteState = merge({}, state);
      delete deleteState[deletereview.business_id].reviews[deletereview.user_id]
      return deleteState;
    default:
      return state;
  }
}

export default businessReducer;

import merge from 'lodash/merge';
import {RECEIVE_BUSINESS, RECEIVE_ALL_BUSINESSES, RECEIVE_REVIEW, REMOVE_REVIEW, RECEIVE_SELECTED_BUSINESSES, RECEIVE_SEARCH_RESULT, REMOVE_ALL_BUSINESSES} from '../actions/business_actions';

const businessReducer = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_BUSINESS:
      const business = action.payload
      return Object.assign({}, {[business.id]: business})
    case RECEIVE_ALL_BUSINESSES:
      return Object.assign({}, action.payload.businesses);
    case RECEIVE_SEARCH_RESULT:
      return Object.assign({}, action.result.businesses);
    case REMOVE_ALL_BUSINESSES:
      return {};
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

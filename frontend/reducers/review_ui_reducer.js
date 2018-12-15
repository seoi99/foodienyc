import merge from 'lodash/merge';

import {
  START_LOADING_REVIEW_INDEX,
  RECEIVE_ALL_BUSINESSES,
} from '../actions/business_actions';

const init_state = {
  loading: true
}
const reviewUiReducer = (state = init_state, action) => {
  Object.freeze(state);
  switch (action.type) {
    case START_LOADING_REVIEW_INDEX:
      return merge({}, state, {loading: true});
    case RECEIVE_ALL_BUSINESSES:
      return merge({}, state, {loading: false});
    default:
      return state;
  }
}

export default reviewUiReducer;

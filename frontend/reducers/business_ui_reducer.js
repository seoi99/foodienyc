import merge from 'lodash/merge';

import {
  LOAD_BUSINESSES,
  LOAD_NO_BUSINSSES,
  RECEIVE_SEARCH_RESULT,
} from '../actions/business_actions';

const init_state = {
  loading: false
}

const businessUiReducer = (state=init_state, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOAD_BUSINESSES:
      return merge({}, state, {loading: true});
    case LOAD_NO_BUSINSSES:
    return merge({}, state, {loading: false});
    default:
      return state;
  }
}

export default businessUiReducer;

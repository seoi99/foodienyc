import merge from 'lodash/merge';

import {
  AUTO_COMPLETE,
} from '../actions/geolocation_actions';

import { RECEIVE_SEARCH_RESULT } from '../actions/business_actions'


const autoReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case AUTO_COMPLETE:
      return Object.assign({}, action.result); break;
    default:
      return state;
  }
}

export default autoReducer;

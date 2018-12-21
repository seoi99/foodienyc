import merge from 'lodash/merge';

import {
  RECEIVE_LOCATION,
} from '../actions/geolocation_actions';

import { RECEIVE_SEARCH_RESULT } from '../actions/business_actions'

const initialState = {
    lat: 40.751116,
    lng: -73.983708
}

const geolocationReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOCATION:
      return Object.assign({}, action.result);
    default:
      return state;
  }
}

export default geolocationReducer;

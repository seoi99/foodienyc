import merge from 'lodash/merge';

import {
  RECEIVE_LOCATION,
  NO_LOCATION,
} from '../actions/geolocation_actions';

import { RECEIVE_SEARCH_RESULT } from '../actions/business_actions'

const initialState = {
    lat: 40.751116,
    lng: -73.983708,
    bounds: {}
}

const geolocationReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LOCATION:
      const location = merge({}, state);
      location.lat = action.result.lat
      location.lng = action.result.lng
      location.bounds = action.bounds;
      return location;
    case NO_LOCATION:
      return initialState;
    default:
      return state;
  }
}

export default geolocationReducer;

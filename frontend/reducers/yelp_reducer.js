import merge from 'lodash/merge'
import {RECEIVE_ALL_BUSINESSES} from '../actions/business_actions';

const yelpReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_BUSINESSES:
      return Object.assign({}, action.payload.yelpBusiness)
    default:
      return state
  }
}

export default yelpReducer

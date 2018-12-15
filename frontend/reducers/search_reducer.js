import merge from 'lodash/merge';
import {DROP_DOWN_RESULT} from '../actions/business_actions';

const searchReducer = (state=[], action) => {
  switch (action.type) {
    case DROP_DOWN_RESULT:
      return Object.assign([], Object.values(action.result.businesses));
    default:
      return state;
  }
}

export default searchReducer;

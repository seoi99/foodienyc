import merge from 'lodash/merge';
import {DROP_DOWN_RESULT, NO_RESULT_FOUND} from '../actions/business_actions';

const searchReducer = (state=[], action) => {
  switch (action.type) {
    case DROP_DOWN_RESULT:
      return Object.assign([], Object.values(action.result.businesses ? action.result.businesses : []));
    case NO_RESULT_FOUND:
      return state;
    default:
      return state;
  }
}

export default searchReducer;

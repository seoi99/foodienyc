import merge from 'lodash/merge';
import {RECEIVE_SEARCH_TEXT} from '../actions/business_actions';

const initialState = {
  text: "",
}
const searchReducer = (state=initialState, action) => {
  switch (action.type) {
    case initialState:
      const result = merge({}, state);
      result.text = action.text;
      break;
    default:
      return state;
  }
}

export default searchReducer;

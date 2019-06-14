import merge from 'lodash/merge';
import {RECEIVE_SEARCH_TEXT, RECEIVE_SEARCH_RESULT, NO_RESULT_FOUND, CLEAR_ERROR} from '../actions/business_actions';

const initialState = {
  text: "",
  result: [],
  error: "",
}
const searchReducer = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_TEXT:
      const text = action.text;
      return {...state, text}
    case RECEIVE_SEARCH_RESULT:
      const result = Object.values(action.result.businesses);
      return {...state, result}
    case NO_RESULT_FOUND:
      const error = action.error;
      return {...state, error}
    case CLEAR_ERROR:
      const noError = merge({}, state);
      noError.error = "";
      return noError;
    default:
      return state;
  }
}

export default searchReducer;

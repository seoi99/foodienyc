import { RECEIVE_REVIEW_ERROR } from '../actions/business_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REVIEW_ERROR:
      return action.errors;
    default:
      return state;
  }
};

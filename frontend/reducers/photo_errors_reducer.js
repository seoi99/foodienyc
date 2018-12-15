import {
  PHOTO_ERROR,
  RECEIVE_PHOTO,
} from '../actions/user_pic_action';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case PHOTO_ERROR:
    
      return action.errors;
    case RECEIVE_PHOTO:
      return [];
    default:
      return state;
  }
};

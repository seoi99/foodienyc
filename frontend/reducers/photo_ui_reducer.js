import merge from 'lodash/merge';

import {
  IMAGE_LOADING,
  REMOVE_PHOTO,
  RECEIVE_PHOTO,
  PHOTO_ERROR,
} from '../actions/user_pic_action';

const init_state = {
  loading: true
}
const photoUiReducer = (state = init_state, action) => {
  Object.freeze(state);
  switch (action.type) {
    case REMOVE_PHOTO:
      return action.photo;
    case IMAGE_LOADING:
      return merge({}, state, {loading: true});

    case RECEIVE_PHOTO:
      return merge({}, state, {loading: false});
    default:
      return state;
  }
}

export default photoUiReducer;

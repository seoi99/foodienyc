import merge from 'lodash/merge';

import {
  RECEIVE_PHOTO,
  REMOVE_PHOTO,
  PHOTO_ERROR,
  RECEIVE_ALL_PHOTOS,
} from '../actions/user_pic_action';

const photoReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PHOTO:
      return merge({}, state, action.payload.photo);
    case REMOVE_PHOTO:
      const deleteState = merge({}, state);
      delete deleteState[currentUser.id]
      return deleteState;
    case RECEIVE_ALL_PHOTOS:
      return action.photos

    default:
      return state;
  }
}

export default photoReducer;

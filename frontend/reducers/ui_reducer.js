import { combineReducers } from 'redux';
import modals from './modal_reducer';
import photos from './photo_ui_reducer';
import reviews from './review_ui_reducer';
import businesses from './business_ui_reducer';


export default combineReducers({
  modals,
  photos,
  reviews,
  businesses,
});

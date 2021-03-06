import { combineReducers } from 'redux';

import users from './users_reducer';
import businesses from './businesses_reducer';
import search from './search_reducer';
import reviews from './reviews_reducer';
import photos from './photos_reducer';
import coordinate from './geolocation_reducer';
import autocomplete from './autocomplete_reducer';


export default combineReducers({
  users,
  businesses,
  reviews,
  photos,
  coordinate,
  search,
  autocomplete,
});

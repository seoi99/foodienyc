import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import review from './review_errors_reducer';
import photo from './photo_errors_reducer';

export default combineReducers({
  session,
  review,
  photo,
});

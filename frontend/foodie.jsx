import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionApiUtil from './util/session_api_util';
import{fetchAllBusinesses, fetchAllReviews, fetchSearchResult} from './util/business_api_util';
import{updateFilter} from './actions/filter_actions';
import{fetchLocation} from './actions/geolocation_actions';
import{createReview, requestAllBusinesses} from './actions/business_actions';


document.addEventListener('DOMContentLoaded', ()=> {
  let store;
  if (window.currentUser) {
  const preloadedState = {
    entities: {
      users: { [window.currentUser.id]: window.currentUser },
      photos: { [window.currentUser.id]: window.user_photo }
    },
    session: { currentUserId: window.currentUser.id }
  };
  store = configureStore(preloadedState);
} else {
  store = configureStore();
}
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchAllReviews = fetchAllReviews;
  window.createReview = createReview;
  window.updateFilter = updateFilter;
  window.fetchLocation = fetchLocation;
  });

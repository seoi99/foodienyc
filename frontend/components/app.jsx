import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter,
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './users/login_form_container';
import SignupFormContainer from './users/signup_form_container';
import MainComponent from './main_pages/main_container';
import BusinessIndexContainer from './businesses/business_index_container';
import BusinessDetailsContainer from './businesses/business_details_container';
import ReviewFormContainer from './reviews/review_form_container';
import ReviewEditFormContainer from './reviews/review_edit_form_container';
import HeaderContainer from './header/header_fixed_container';
import BizReviewContainer from './write_a_review/biz_review_container';
import ProfileContainer from './about_me/profile';
import Modal from './modal/modal';

const App = () => {
  return(
    <div>
      <Modal />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/businesses/login" component={LoginFormContainer} />
      <AuthRoute exact path="/businesses/signup" component={LoginFormContainer} />
      <Route exact path="/reviews" component={BizReviewContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />

      <Route exact path="/" component={MainComponent} />
      <Route exact path="/users" component={MainComponent} />
      <Route exact path="/businesses" component={BusinessIndexContainer} />
      <Route exact path="/businesses/:businessId" component={BusinessDetailsContainer} />
      <Route exact path="/businesses/search" component={HeaderContainer} />
      <ProtectedRoute exact path="/businesses/:businessId/reviews/:reviewId" component={ReviewEditFormContainer} />
      <ProtectedRoute exact path="/businesses/:businessId/reviews" component={ ReviewFormContainer }/>
    </div>

  );
};
export default App;
// <Route path="/businesses/:businessId/reviews" component={ReviewForm} />
// <Route path="/businesses/:businessId/reviews/:reviewId" component={ReviewEditForm} />

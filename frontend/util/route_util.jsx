import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({ component: Component, path, loggedIn, exact }) => { //prevents logged in user from seeing log in / sign up
  function toRender(props) {

    if (loggedIn) {
      if (path === "/login" || path === "/signup"){
        return <Redirect to='/'/>;
      }
      else if (path === "/businesses/login" || path === "/businesses/signup") {
        return <Redirect to='/businesses'/>;
      }
      }
     else {
      return <Component {...props} />;
    }
  }
  return (
    <Route path={path} exact={exact} render={toRender} />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = state => {
  return {
    loggedIn: Boolean(state.session.currentUserId),

  };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));

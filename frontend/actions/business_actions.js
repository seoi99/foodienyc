import * as BusinessApiUtil from '../util/business_api_util';
import { fetchLocation } from './geolocation_actions';
export const RECEIVE_ALL_BUSINESSES = 'RECEIVE_ALL_BUSINESSES';
export const RECEIVE_BUSINESS = 'RECEIVE_BUSINESS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export const RECEIVE_NO_RESULT = 'RECEIVE_NO_RESULT';
export const RECEIVE_ALL_REVIEW = 'RECEIVE_ALL_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const RECEIVE_REVIEW_ERROR = 'RECEIVE_REVIEW_ERROR';
export const START_LOADING_REVIEW_INDEX = 'START_LOADING_REVIEW_INDEX';
export const LOAD_BUSINESSES = 'LOAD_BUSINESSES';
export const LOAD_NO_BUSINSSES = 'LOAD_NO_BUSINSSES';
export const DROP_DOWN_RESULT = 'DROP_DOWN_RESULT';
export const GOTOREVIEW = 'GOTOREVIEW';
export const NO_RESULT_FOUND = 'NO_RESULT_FOUND';

export const loadBusinesses = () => {
  return {
    type: LOAD_BUSINESSES,
  }
}



export const loadNoBusinesses = () => {
  return {
    type: LOAD_NO_BUSINSSES,
  }
}

export const receiveAllBusinesses = (payload) => {
  return {
  type: RECEIVE_ALL_BUSINESSES,
  payload
  }
};

export const receiveReviewErrors = (errors) => ({
  type: RECEIVE_REVIEW_ERROR,
  errors
});

export const receiveSearchResult = (result) => {
  return {
  type: RECEIVE_SEARCH_RESULT,
  result
  }
}
export const receiveNoResult = () => {
  return {
  type: RECEIVE_NO_RESULT,
  }
}
export const getSearchResult = (query, location) => {
  dispatch(loadNoBusinesses())
  return (dispatch) => {
    BusinessApiUtil.fetchSearchResult(query).then((businesses) => {
      dispatch(receiveSearchResult(businesses))
    }).then(() => dispatch(fetchLocation(location)))
    .then(() => dispatch(loadBusinesses(location)))
  }
}


export const dropdownResult = (result) => {
  return {
  type: DROP_DOWN_RESULT,
  result
  }
}

export const noResultFound = (result) => {
  return {
  type: NO_RESULT_FOUND,
  result: `No query result found by ${result}`
  }
}

export const getDropdownResult = (query) => {
  return (dispatch) => {
    BusinessApiUtil.fetchSearchResult(query).then((businesses) => {
      dispatch(dropdownResult(businesses))
    },(error) => {
      dispatch(receiveNoResult())
    })
  }
}



export const receiveBusiness = (payload) => ({
  type: RECEIVE_BUSINESS,
  payload,
});

export const requestAllBusinesses = () => (dispatch) => {
    dispatch(startLoadingReviewIndex());
    return BusinessApiUtil.fetchAllBusinesses().then((payload) => {
      dispatch(receiveAllBusinesses(payload));
    });
};

export const requestBusiness = (id) => {
  return (dispatch) => {
    BusinessApiUtil.fetchBusiness(id).then((business) => {
      dispatch(receiveBusiness(business));
    });
  };
};


export const receiveReview = ({ review, average_rating, user }) => {
  return {
  type: RECEIVE_REVIEW,
  review,
  average_rating,
  user,
}};

export const receivewAllReviews = (reviews) => {

  return {
  type: RECEIVE_ALL_REVIEW,
  reviews
  }
}

export const startLoadingReviewIndex = () => {
  return {
    type: START_LOADING_REVIEW_INDEX
  }
}

export const requestAllReviews = () => dispatch => {
  return BusinessApiUtil.fetchAllReviews().then(reviews => (
    dispatch(receivewAllReviews(reviews))
  ))
}


export const removeReview = ({review}) => {
  return {
  type: REMOVE_REVIEW,
  deletereview: review
}};


export const createReview = review => dispatch => {
  return BusinessApiUtil.createReview(review).then(review => (
    dispatch(receiveReview(review))
  ), (error) => {
    dispatch(receiveReviewErrors(error.responseJSON))
  })
};


export const updateReview = review => dispatch => {

  return BusinessApiUtil.updateReview(review).then(review => (
    dispatch(receiveReview(review))
  ), (error) => {
    dispatch(receiveReviewErrors(error.responseJSON))
  })
};

export const deleteReview = id => dispatch => {

  return BusinessApiUtil.deleteReview(id).then(
    (review) => {
      dispatch(removeReview(review))}
  )
};

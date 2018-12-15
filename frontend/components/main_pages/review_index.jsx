  import { Link } from 'react-router-dom'
import React from 'react';

const ReviewIndex = ({review, currentUserId}) => {
  if (review.body.length > 100) {
    for (var i = 100; i < review.body.length; i++) {
      if (review.body[i] === " ") {
        break
      }
    }
    review.body = `${review.body.slice(0,i)} ...`
  }
  const RateConversion = Array.from(Array(5).keys()).map((val, idx) => {
    if (idx + 1 <= review.rating) {
      return <div className="avg-rating" key={idx}></div>
    } else {
      return <div className="avg-rating-bad" key={idx}></div>
    }
  });
  let usercolor = "";
  if (currentUserId !== undefined && currentUserId == review.user_id) {
    usercolor = "green"
  }
  return (
  <div className="review-index-component">
    <li className="user-fa-icon"> <i className={`fa fa-user ${usercolor}`}></i> {review.firstname} {review.lastname} </li>
    <li className="biz-border"> <Link to={`/businesses/${review.business_id}`}>{review.business_name}</Link></li>
    <li  className="review-index"> {RateConversion}</li>
    <li> {review.body}</li>
  </div>
  )
}

export default ReviewIndex;

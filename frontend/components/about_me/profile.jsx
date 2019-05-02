import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {requestAllReviews} from '../../actions/business_actions';
import HeaderContainer from '../header/header_fixed_container';
import UserPicContainer from '../user_pic/user_pic_container';
import Footer  from '../footer/footer';

class Profile extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.requestAllReviews();
  }
  render() {
    let count = 0
    const reviews = Object.values(this.props.reviews).map((review, idx) => {
      const RateConversion = Array.from(Array(5).keys()).map((val, idx) => {
        if (idx + 1 <= review.rating) {
          return <li className="avg-rating" key={idx}></li>
        } else {
          return <li className="avg-rating-bad" key={idx}></li>
        }
      });
      if (review.user_id === this.props.currentUserId) {
        count ++
          return (
          <div key={idx} className="ul-content">
            <li> You wrote a review for <Link to={`/businesses/${review.business_id}`}>{review.business_name}</Link></li>
            <li>{review.user}</li>
            <div className="rev">{RateConversion}</div>
            <li>{review.body}</li>
          </div>
          )
      }
    })
    const firstname = this.props.user[this.props.currentUserId].firstname
    const lastname = this.props.user[this.props.currentUserId].lastname
    const zipcode = this.props.user[this.props.currentUserId].zipcode

    return(
      <div>
        <HeaderContainer/>
        <div className="prof-header">
          <UserPicContainer/>
          <div className="prof-des-flex">
          <h1>{firstname} {lastname}</h1>
          <h3>Manhatten, New York, NY</h3>
          <div className="prof-icons">
            <h3><b>{count}</b> Review</h3>
          </div>
          </div>
        </div>

        <ul className="prof-body">
          <h1>Your Recent Activity </h1>
          {reviews}
        </ul>
      <Footer/>
    </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
    reviews: state.entities.reviews,
    currentUserId: state.session.currentUserId,
    user: state.entities.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestAllReviews: () => dispatch(requestAllReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

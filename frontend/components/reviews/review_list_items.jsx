import React from 'react';

class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photoUrl: null}
  }
  componentDidMount(){
    this.props.requestAllPhotos();
    
  }

  render(){
      const review = this.props.review;

      if (review ) {
      let deleteButton;
        if (this.props.currentUserId === this.props.review.user_id) {
          deleteButton = <button onClick={() => this.props.deleteReview(review.id)}></button>
        }
        let img = this.props.photos[this.props.review.user_id];
        let userImg;
        if (img) {
          userImg = <img className="user-icon-item" src={img.photoUrl}/>
        }
         else {
          userImg = <img className="user-icon-item" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>
        }


      const RateConversion = Array.from(Array(5).keys()).map((val, idx) => {
        if (idx + 1 <= review.rating) {
          return <li className="avg-rating" key={idx}></li>
        } else {
          return <li className="avg-rating-bad" key={idx}></li>
        }
      });


      return (
        <div className="but-nobut">
        <div className="rev-list-item">
          <div className="rev-user">
            {userImg}
            <li>{review.firstname}</li>
          </div>
          <div className="rev-content">
            <div className="rev-col">
            <div className="star-revss">{RateConversion}</div>
            <li> {review.body}</li>
            </div>
          </div>
        </div>
        {deleteButton}

        </div>
      )
      }
      else {
        return (<h1></h1>)
      }

}}

export default ReviewListItem

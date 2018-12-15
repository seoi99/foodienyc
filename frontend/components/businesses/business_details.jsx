import React from 'react';
import HeaderContainer from '../header/header_fixed_container';
import {Link} from 'react-router-dom';
import GoogleMap from '../business_map/google_map';
import ReviewListItem from '../reviews/review_list_items';
import Footer  from '../footer/footer';


class BusinessDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: 0
    }
  }

  componentDidMount() {
    this.props.requestBusiness(this.props.businessId);
  }

  componentDidUpdate() {
    if (this.props.business) {
      if (this.props.business.reviewIds.length !== this.state.reviews) {
        this.setState({reviews: this.props.business.reviewIds.length})
        this.props.requestBusiness(this.props.businessId);
      }
    }
  }

  render() {

      const currentDate = new Date();
      const currentDay = Date().slice(0,3);
      const currentHours = currentDate.getHours();
      const currentMin = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
      const currentTime = currentHours.toString() + currentMin.toString();
      const business = this.props.business;


      if (business !== undefined ) {
        const reviews = business.reviews === undefined ? {} : business.reviews
        const userIds = Object.keys(reviews)
        const currentUserId = this.props.currentUserId || -1;
        const currentReviewId = reviews[currentUserId];

        const reviewAction = () => {
          if (userIds.includes(currentUserId.toString())) {
          return <Link to={`/businesses/${business.id}/reviews/${currentReviewId.id}`}><button>Edit a Review</button></Link>
        } else {
          return <Link to={`/businesses/${business.id}/reviews`}><button>Write a Review</button></Link>
        }
      }
      const user = this.props.user;
      const reviewsmap = Object.values(reviews).map((review, idx) => {
        return (
          <ReviewListItem key={idx} review={review} deleteReview={this.props.deleteReview} currentUserId = {this.props.currentUserId} photos = {this.props.photos}
            requestAllPhotos = {this.props.requestAllPhotos}/>
        )
      })
      const images = business.images.map(image => <img src={image.img_url} key={image.id} />);



      const getCurrentDay = business.hours.map(hour => {

        if (currentDay === hour.day) {
          if (parseInt(currentTime) > hour.open.replace(":","") && parseInt(currentTime) < hour.close.replace(":","")) {

            if (hour.close.slice(0,2) > 12) {
              hour.close = (hour.close.slice(0,2) - 12) + hour.close.slice(2)
            }
            return (
              <div  className="open-div" key={hour.id}>Today <b>{hour.open} am - {hour.close} pm </b>
                <span className="open-status">Open Now</span>
              </div>
            )
          } else {
            if (hour.close.slice(0,2) > 12) {
              hour.close = (hour.close.slice(0,2) - 12) + hour.close.slice(2)
            }
            return (
              <div className="close-div" key={hour.id}> <b>Today {hour.open} am  - {hour.close} pm </b>
                <span className="closed-status"> Closed </span>
              </div>
          )
          }
        }
      })

      const hours = business.hours.map(hour => {
        if (hour.close.slice(0,2) > 12) {
          hour.close = (hour.close.slice(0,2) - 12) + hour.close.slice(2)
        }
          return (<div className="day-hours" key={hour.id}>
          <li >{hour.day}: </li>
          <li>{hour.open} am - {hour.close} pm </li>
        </div>)
      });



        const priceConversion = (output) => {
          let symb = ""
          for (let i = 10; i <= 40; i += 10) {
          if (i <= output) {
            symb += "$";
          } else {
            return symb;}
      }}

      const avgPriceConversion = Array.from(Array(5).keys()).map((val, idx) => {

        if (idx + 1 <= priceConversion(business.price).length) {
          return <li className="avg-price" key={idx}></li>
        } else {
          return <li className="avg-price-bad" key={idx}></li>
        }
      });

      const avgRateConversion = Array.from(Array(5).keys()).map((val, idx) => {
        if (idx + 1 <= business.average_rating) {
          return <li className="avg-rating" key={idx}></li>
        } else {
          return <li className="avg-rating-bad" key={idx}></li>
        }
      });


        return(
        <div>
          <HeaderContainer/>
          <div className="bg-three">
            <div className="width-all">
            <div className="bizn-review">
              <div className="bizn">
                <h1>{business.business_name}</h1>
                <ul className="avgrate">
                  {avgRateConversion}
                </ul>
                <div className="price-cat">
                  <p className="price">{priceConversion(business.price)}</p>
              </div>
              </div>
              <div className="review-but-row">
                {reviewAction()}
              </div>
            </div>
            <div className="map-img">
              <div className="map-details">
              <GoogleMap requestBusiness={this.props.requestBusiness} business={this.props.business} businessId={this.props.businessId} singleBusiness={true}/>
              <p>{business.full_address}</p>
              <p>{business.phone_number}</p>
              </div>
              {images}
            </div>
            </div>
        </div>

          <div className="biz-show-main">
            <div className="biz-show-reviews">
              <ul className="review-list">
                {reviewsmap}
              </ul>
            </div>

            <div className="biz-show-side">
              <div className="time-menu-price">
                {getCurrentDay}
                <p className="web"><a href={business.website}>Full Menu</a></p>
                <ul className="biz-sym-price">
                  {avgPriceConversion}
                  <li> Price range Under ${business.price} </li>
                </ul>
              </div>
              <ul className="biz-hours">
                <h1>Hours</h1>
                {hours}
              </ul>
          </div>
          </div>
          <Footer />
        </div>
      );
    }


    else {
      return (
        <h1></h1>
      );
    }
    }
}

export default BusinessDetails;

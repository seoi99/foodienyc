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
    console.log('hit mount')
    this.props.requestBusiness(this.props.businessId);
  }

  componentDidUpdate() {
    console.log('hit update')
  }

  reviewClicked() {
    this.props.reviewClicked();
  }
  render() {
      const currentDate = new Date();
      const currentDay = Date().slice(0,3).toUpperCase();
      const currentHours = currentDate.getHours();
      const currentMin = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes();
      const currentTime = currentHours.toString() + ":"+  currentMin.toString();
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
          return <Link to={`/businesses/${business.id}/reviews`}><button onClick={this.reviewClicked.bind(this)}>Write a Review</button></Link>
        }
      }
      const user = this.props.user;
      let reviewsmap;
      if (Object.values(reviews).length === 0) {
        reviewsmap = (
          <div className="rev-list-item">
            <p className="no-review">
              Write the first review for
               <Link to={`/businesses/${business.id}/reviews` } ><button className="first-review" onClick={this.reviewClicked.bind(this)}>{this.props.business.business_name}</button></Link>
            </p>
        </div>)
      } else {
        reviewsmap = Object.values(reviews).map((review, idx) => {
        return (
          <ReviewListItem key={idx} review={review} deleteReview={this.props.deleteReview} currentUserId = {this.props.currentUserId} photos = {this.props.photos}
            requestAllPhotos = {this.props.requestAllPhotos}/>
        )
      })
      }
      const images = business.images.map(image => <img src={image.img_url} key={image.id} />);



      const getCurrentDay = business.hours.map(hour => {
        const noon = "12:00"
        let ot = hour.open >= noon ? "pm" : "am"
        let ct = hour.close >= noon ? "pm" : "am"
        let open = hour.open > noon ? (parseInt(hour.open.slice(0,2)) - 12).toString() + hour.open.slice(2) : hour.open
        let close = hour.close > noon ? (parseInt(hour.close.slice(0,2)) - 12).toString() + hour.close.slice(2) : hour.close
        open = open.slice(0,2) === "00"? "12" + hour.open.slice(2) : open;
        close = close.slice(0,2) === "00" ? "12" + hour.close.slice(2) : close;

        if (currentDay === hour.day) {
          if (currentTime > hour.open && currentTime < hour.close) {
            return (
              <div  className="open-div" key={hour.id}>Today <b>{open} {ot} - {close} {ct} </b>
                <span className="open-status">Open Now</span>
              </div>
            )
          } else {
            return (
              <div  className="close-div" key={hour.id}>Today <b>{open} {ot} - {close} {ct} </b>
                <span className="closed-status"> Closed </span>
              </div>
          )
          }
        }
      })

      const hours = business.hours.map(hour => {
        const noon = "12:00"
        let ot = hour.open >= noon ? "pm" : "am"
        let ct = hour.close >= noon ? "pm" : "am"
        let open = hour.open > noon ? (parseInt(hour.open.slice(0,2)) - 12).toString() + hour.open.slice(2) : hour.open
        let close = hour.close > noon ?  (parseInt(hour.close.slice(0,2)) - 12).toString() + hour.close.slice(2) : hour.close
        open = open.slice(0,2) === "00" ? "12" + hour.open.slice(2) : open;
        close = close.slice(0,2) === "00" ? "12" + hour.close.slice(2) : close;

          return (<div className="day-hours" key={hour.id}>
          <li >{hour.day}: </li>
          <li> {open} {ot} - {close} {ct} </li>
        </div>)
      });



        const priceConversion = (output) => {
          let symb = ""
          for (let i = 10; i <= 50; i += 10) {
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

      let avgRateConversion = Array.from(Array(5).keys()).map((val, idx) => {
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

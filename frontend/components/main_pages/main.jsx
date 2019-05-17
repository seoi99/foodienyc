import React from 'react';
import { Link } from 'react-router-dom';
import Footer  from '../footer/footer';
import ReviewIndex  from './review_index';
import BusinessMainIndexItem  from './business_main_index';
import Dropdown from '../header/dropdown';
import HeaderContainer from '../header/header_fixed_container';



class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false, dropdown: "hidden", businesses: {}};
    this.toggleClass= this.toggleClass.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentDidMount() {
    this.props.requestAllReviews();
  }
  handleClick(e) {
  return this.props.logout();
}

toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
}

  render () {
    let toggle = "hide-dropdown";
    if (this.state.active === true) {
      toggle = "dropdown";
    }

    let signinform;
    let img = this.props.photo ? <img className="profile-icon" src={this.props.photo.photoUrl}/> : <img className="profile-icon" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>
    let mainImg = this.props.photo ? <img className="user-icon" src={this.props.photo.photoUrl} onClick={this.toggleClass}/> : <img className="user-icon" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png" onClick={this.toggleClass}/>
    if (this.props.currentUser) {
      signinform = (
      <div className="signup-links">
          {mainImg}
          <div className={toggle} onClick={this.toggleClass}>
              <ul className="lists">
                <div className="dropdown-triangle"></div>
                <div className="profile">
                  {img}
                  <div className="user-details">
                    <li>{this.props.currentUser.firstname} {this.props.currentUser.lastname[0]}.</li>
                    <li>Manhatten, New York, NY</li>
                  </div>
                </div>
                <li className="about-me"><Link to="/profile">About Me</Link></li>
                <li onClick={this.handleClick}>Logout</li>
              </ul>
          </div>
      </div>
      )
    } else {
      signinform = (
        <div className="signup-links">
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )
    }


    let reviews;
    let currentUserId = this.props.currentUserId;
    if (Object.keys(this.props.reviews).length > 0) {
      reviews = Object.values(this.props.reviews).map((review, idx) => {
    return <ReviewIndex review={review} key={idx} currentUserId={currentUserId}/>
    }).reverse().filter((val, idx) => idx < 12)}

    let businesses;
    if (Object.keys(this.props.businesses).length > 0) {
    businesses = Object.values(this.props.businesses).map((business, idx) => {
    return <BusinessMainIndexItem business={business} key={idx} />
    }).reverse().filter((val, idx) => idx < 3)}

      return(
      <div>
        <div className="main-image" >
        <nav>
          <div className="nav-links">
            <Link to='/reviews'>Write a Review</Link>
          </div>
          {signinform}
        </nav>
        <div className="main-logo">
          <Link to="/"><h1>Foodie</h1></Link>
        </div>

        <HeaderContainer c1="input-main" c2="nav-links" c3="input-box" c4="goto-cat" b1="main-image" h1="hide-el" h2="none"/>

      </div>
      <div className="main-business">
        <h1>Hot & New Businesses </h1>
        <ul className="biz-index-container">
          {businesses}
        </ul>
      </div>
      <div className="main-reviews">
        <h1>Recent Activities</h1>
        <ul className="review-index-container">
          {reviews}
        </ul>
      </div>
        <Footer />
      </div>

      );
    }
  }


export default MainPage;

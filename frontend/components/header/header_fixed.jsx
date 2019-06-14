import React from 'react';
import Dropdown from './dropdown';
import {Link, withRouter} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active: false, searchtxt: "", location: "", dropdown: "hidden", submitted: false, len: 0};
    this.toggleClass = this.toggleClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.navigateToIndex = this.navigateToIndex.bind(this);
    this.clicked = this.clicked.bind(this);

  }

  handleClick(e) {
    return this.props.logout();
  }

  componentDidMount() {
    this.props.requestAllBusinesses();
    if (this.props.currentUser) {
      this.props.requestPhoto(this.props.currentUser.id)
      }
  }


  toggleClass() {
    const currentState = this.state.active;
    this.setState({active: !currentState});
  }

  handleChange(e) {
    this.props.receiveSearchText(e.currentTarget.value);
    this.setState({searchtxt: e.currentTarget.value});
    this.setState({dropdown:"show"});

  }


  handleLocation(e) {
    this.setState({location: e.currentTarget.value});
  }

  navigateToIndex() {
    this.props.history.push(`/businesses`)
  }


  showPosition(position) {
    position.coords.latitude
    position.coords.longitude
  }

  handleButtonClick(e) {
    e.preventDefault();
      this.props.getSearchResult(e.target.value, "new york city");
    if (this.props.receiveSearch) {
      this.props.receiveSearch(e.target.value, "current location")
    }
    this.navigateToIndex();
  }


  handleSubmit(e) {
    e.preventDefault();
    this.setState({dropdown: "hidden", submitted: true});
    this.props.getSearchResult(this.props.text, this.state.location);
    if (this.props.receiveSearch) {
      this.props.receiveSearch(this.props.text, this.state.location);
    }
    this.navigateToIndex();
  }

  clicked(e) {
      this.setState({dropdown:"show"})
  }

  render() {


    let h7 = this.props.h1 || "signup-links"
    let h8 = this.props.h1 || "linktopage"

    let toggle = "hide-dropdowns";
    if (this.state.active === true) {
      toggle = "dropdowns";
    }
    let img = this.props.photo ? <img className="profile-icon" src={this.props.photo.photoUrl}/> : <img className="profile-icon" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>
    let mainImg = this.props.photo ? <img className="user-icons" src={this.props.photo.photoUrl} onClick={this.toggleClass}/> : <img className="user-icons" src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png" onClick={this.toggleClass}/>
    let signup;
      if (this.props.currentUser) {
        signup = (
          <div className={h7}>
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
        signup = (
          <div className={h8}>
            <Link to="/businesses/login">Log In</Link>
            <Link to="/businesses/signup">Sign Up</Link>
          </div>
        )
      }
    let c1 = this.props.c1 || "input-box"
    let c2 = this.props.h1 || ""
    let c3 = this.props.c3 || ""
    let c4 = this.props.c4 || "cat"
    let h1 = this.props.h1 || ""
    let h2 = this.props.h2 || "header-all"
    let h3 = this.props.h2 || "headerfix"
    let h4 = this.props.h2 || "lab-flex"
    let h5 = this.props.h2 || "bg"
    let h6 = this.props.h2 || "cat-review"


  return(
    <div>
      <div className={h2}>

        <Link to="/" className={h1}>Foodie</Link>

          <div className={c1}>
            <div className={c3}>
            <form className={h3} onSubmit={this.handleSubmit}>
              <label className={h4}>
                <p>Find</p>
                <input type="text" placeholder="korean, japanese, salad ..."
                  onChange={this.handleChange} value={this.state.searchtxt}
                  onClick={this.clicked}
                   />
                 <div className={this.state.dropdown}>
                  <Dropdown selectBusinesses={this.selectBusinesses} businesses={this.props.businesses} text={this.props.text}/>
                </div>
              </label>
              <label>
                <p>Near</p>
                <input onChange={this.handleLocation} type="text" placeholder="location..."
                  value={this.state.location}/>
              </label>
              <button type="submit" value="" className="magify"/>
            </form>

          </div>
          </div>

          {signup}

      </div>

      <div className={h5}>
        <div className={h6}>
          <ul className={c4}>
            <i className="fa fa-spoon"></i><input type="button" value="Burger" onClick={this.handleButtonClick}/>
            <i className="fa fa-spoon"></i><input type="button" value="Salad" onClick={this.handleButtonClick} />
            <i className="fa fa-spoon"></i><input type="button" value="Italian" onClick={this.handleButtonClick} />
            <i className="fa fa-spoon"></i><input type="button" value="Japanese" onClick={this.handleButtonClick} />
            <i className="fa fa-spoon"></i><input type="button" value="Korean" onClick={this.handleButtonClick} />
          </ul>

          <Link to="/reviews" className={c2}>Write a Review</Link>
        </div>

    </div>

    </div>
    );
  }
}

export default withRouter(Header);

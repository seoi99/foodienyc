import React from 'react';
import BusinessIndexItem from './business_index_item';
import HeaderContainer from '../header/header_fixed_container';
import GoogleMap from '../business_map/google_map';
import { Link } from 'react-router-dom';
import Footer  from '../footer/footer';

class BusinessIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receivetxt: null,
      location: null,
      count: 0,
      businesses: [],
    }
    this.receiveSearch = this.receiveSearch.bind(this);
    this.receiveUpdates = this.receiveUpdates.bind(this);


  }
  receiveSearch(txt, loc) {
    this.setState({receivetxt: txt, location: loc})
  }
  receiveUpdates(businesses) {
    this.setState({businesses: businesses})
  }

  queryResult() {
    if (this.state.receivetxt || this.state.location) {
        if (this.state.businesses.length === 0) {
            return <h1> No Resturant Found based on your search. Try different Keyword or Location </h1>
        } else {
          let s = this.state.receivetxt ? `by ${this.state.receivetxt}` : ""
          let l = this.state.location ? `Near ${this.state.location}` : ""
            return <h1> {this.state.businesses.length} resturants found {s} {l} </h1>
        }
    }
  }

  render() {
    let businesses;
       if (this.state.businesses) {
         businesses = this.state.businesses.map((business, idx) => {
                return <BusinessIndexItem business={business} key={idx} num={idx} fetchLocation={this.props.fetchLocation} />
            });
       }
      return(
      <div>
        <HeaderContainer receiveSearch={this.receiveSearch}/>
        <div className="bg-two">
          <div className="biz-shelf">
            <h1>Welcome to Foodie</h1>
            {this.queryResult()}
          </div>
        </div>
        <div className="biz-idx-main">
          <ul>
            {businesses}
          </ul>
          <div className="all-map">
            <GoogleMap singleBusiness={false} location={this.state.location} receiveUpdates={this.receiveUpdates}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default BusinessIndex;

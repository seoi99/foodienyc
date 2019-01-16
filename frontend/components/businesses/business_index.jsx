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
    }
    this.receiveSearch = this.receiveSearch.bind(this);
  }


  receiveSearch(txt, loc) {
    this.setState({receivetxt: txt, location: loc})
  }

  render() {
    let queryResult;

    let businesses = this.props.businesses.filter(business => {
      if ((Math.abs(this.props.latlng.lat - business.latitude) < 0.03) &&
        (Math.abs(this.props.latlng.lng - business.longitude) < 0.03)) {
          return business
        }
    }).map((business, idx) => {
           return <BusinessIndexItem business={business} key={idx} num={idx} fetchLocation={this.props.fetchLocation} />
       });

     let mapbusiness = this.props.businesses.filter((business, idx) => {
        if ((Math.abs(this.props.latlng.lat - business.latitude) < 0.03) &&
          (Math.abs(this.props.latlng.lng - business.longitude) < 0.03)) {
            return business
          }
        });
        if (this.state.receivetxt || this.state.location) {
            if (mapbusiness.length === 0) {
                queryResult = <h1> No Resturant Found based on your search. Try different Keyword or Location </h1>
            } else {
              let s = this.state.receivetxt ? `by ${this.state.receivetxt}` : ""
              let l = this.state.location ? `Near ${this.state.location}` : ""
              queryResult = <h1> {mapbusiness.length} resturants found {s} {l} </h1>
            }
        }

      return(
      <div>
        <HeaderContainer receiveSearch={this.receiveSearch}/>
        <div className="bg-two">
          <div className="biz-shelf">
            <h1>Welcome to Foodie</h1>
            {queryResult}
          </div>
        </div>
        <div className="biz-idx-main">
          <ul>
            {businesses}
          </ul>
          <div className="all-map">
            <GoogleMap businesses={mapbusiness} singleBusiness={false} location={this.state.location}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default BusinessIndex;

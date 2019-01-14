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
    let businesses = this.props.businesses.map((business, idx) => {
      if ((Math.abs(this.props.latlng.lat - business.latitude) >= 0.4) &&
        (Math.abs(this.props.latlng.lng - business.longitude) >= 0.4)) {
          return null
        }
        else {
          return <BusinessIndexItem business={business} key={idx} num={idx} fetchLocation={this.props.fetchLocation} />
          }
    });

      return(
      <div>
        <HeaderContainer receiveSearch={this.receiveSearch}/>
        <div className="bg-two">
          <div className="biz-shelf">
            <h1>Welcome to Foodie </h1>
          </div>
        </div>
        <div className="biz-idx-main">
          <ul>
            {businesses}
          </ul>
          <div className="all-map">
            <GoogleMap businesses={this.props.businesses} singleBusiness={false} location={this.state.location}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}


export default BusinessIndex;

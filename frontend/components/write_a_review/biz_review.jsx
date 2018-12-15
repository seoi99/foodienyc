import React from 'react';
import {Link} from 'react-router-dom';
import HeaderContainer from '../header/header_fixed_container';
import LoadingIcon from './loading_icon';
import Footer  from '../footer/footer';

class BusinessReivew extends React.Component {
  constructor(props) {
    super(props)
    this.props.requestAllBusinesses();
  }
  componentDidMount() {
  }
  render() {
      let businesses;
      if (this.props.loading) {
        businesses = <div className='loading-img'></div>
      } else {
        businesses = (
          this.props.businesses.map((business,idx) => {
            const AvgRateConversion = Array.from(Array(5).keys()).map((val, idx) => {
                return <div className="avg-rating-bad" key={idx}></div>
            });

            return(
            <ul key={idx} className="w-1-row">
              <div className="w-1-3">
                <img src={business.images[0].img_url} />
              </div>
              <div className="w-2-3">
                <li><Link to={`businesses/${business.id}`}>{business.business_name}</Link></li>
                <li>{business.full_address}</li>
                <div className="review-rrr">
                  {AvgRateConversion}
                </div>
              </div>

            </ul>
            )
          })
        )
      }
      return(
        <div>
          <HeaderContainer loading={this.props.loading}/>
        <div className="yelp-write">
          <div className="write">
            <h2>Your Next Review awaits</h2>
            <p>Review your favorite businesses and share your experiences with our community. Need a little help getting started? Check out these tips.</p>
          </div>
          <img src="./assets/yelp_review_img.png"/>
        </div>
        <h1 className="h1-rev-head">Been to these Businesses Recently?</h1>
        <div className="review-content">
          {businesses}
        </div>
        <Footer/>
        </div>
      )
  }

}

export default BusinessReivew

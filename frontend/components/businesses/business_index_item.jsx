import React from 'react';
import { Link } from 'react-router-dom';
class BusinessIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ""
    }
  }
  componentDidUpdate() {
    if (this.props.num === 0 && this.state.name !== this.props.business.full_address) {
      this.props.fetchLocation(this.props.business.full_address)
      this.setState({name: this.props.business.full_address})
    }
  }

  render () {
    let business = this.props.business
    const images = business.images.map((image, idx) => {
      return (
        <li key={image.id}> <img src={image.img_url} alt={business.business_name} /></li>
        );
      });
      const AvgRateConversion = Array.from(Array(5).keys()).map((val, idx) => {
        if (idx + 1 <= business.average_rating) {
          return <div className="avg-rating" key={idx}></div>
        } else {
          return <div className="avg-rating-bad" key={idx}></div>
        }
      });
      const priceConversion = (output) => {
        let symb = ""
        for (let i = 10; i <= 50; i += 10) {
        if (i <= output) {
          symb += "$";
        } else {
          return symb;}
    }}

    return(
      <li className="index-li">
        <ul className="img-list">
          {images[0]}
        </ul>
        <div className="index-info">
          <div className="business-info">
            <div className="businessId">
              <p><Link to={`/businesses/${business.id}`}><span>{this.props.num + 1}. </span>{business.business_name}</Link></p>
              <div className="all-five-rates">
                {AvgRateConversion}
                <span>{business.reviewIds.length} reviews</span>
              </div>
              <div className="p-info-catg">
                <p>{priceConversion(business.price)}</p>
                <p>{business.category} </p>
              </div>
            </div>
            <div className="business-content">
              <p>{business.phone_number}</p>
              <p>{business.full_address}</p>
            </div>
          </div>
          <p>
          </p>
        </div>
      </li>
    );
  }
};

export default BusinessIndexItem;

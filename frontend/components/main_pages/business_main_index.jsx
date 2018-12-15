import React from 'react';
import { Link } from 'react-router-dom';
const BusinessMainIndexItem = ({business, num}) => {

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
      for (let i = 10; i <= 40; i += 10) {
      if (i <= output) {
        symb += "$";
      } else {
        return symb;}
  }}

  return(
    <li className="biz-main-content">
      <ul className="first-image">
        {images[0]}
      </ul>
      <div className="business-index">
        <p><Link to={`/businesses/${business.id}`}>{business.business_name}</Link></p>
        <div className="avg-revnum">
          {AvgRateConversion}
          <span>{business.reviewIds.length} reviews</span>
        </div>
        <div>
          <p>{priceConversion(business.price)}</p>
          <p>{business.category} </p>
        </div>
      </div>
    </li>
  );
};

export default BusinessMainIndexItem;

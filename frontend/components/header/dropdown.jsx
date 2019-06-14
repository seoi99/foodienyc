import React from 'react';
import { Link } from 'react-router-dom';
class Dropdown extends React.Component {
  constructor(props) {
    super(props)
    this.selectBusinesses = this.selectBusinesses.bind(this);
  }

  selectBusinesses (businesses, txt) {
      const bizCat = ["Japanese", "Korean", "Italian" ,"Burger", "Salad"]
        let bizArr = [];
        if (Object.values(businesses)) {
        bizArr = Object.values(businesses).filter((biz, idx) => biz.business_name.toLowerCase().includes(txt.toLowerCase()));
        if (bizArr.length > 6) {
          bizArr = bizArr.slice(0,6)
        }
        }
    return bizArr
  };

  render() {
    const bizArr = this.selectBusinesses(this.props.businesses, this.props.text)
    const list = bizArr ? bizArr.map((el, idx) => {
      return (
       <div key={idx} className="biz-dropdown">
         <li><Link to={`/businesses/${el.id}`}>{el.business_name}</Link></li>
       </div>
     )
   }) : []
    return(
      <ul>
        {list}
      </ul>
    )
    }
}


export default Dropdown;

import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import { selectBusiness } from '../../reducers/selector';
import {receiveSearchText, getSearchResult, getDropdownResult ,loadBusinesses} from '../../actions/business_actions'

class Dropdown extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    console.log(this.props.dropDown);
  }
  render() {
    const list = this.props.businesses ? this.props.dropDown.map((el, idx) => {
      return (
       <div key={idx} className="biz-dropdown">
         <li><Link to={`/businesses/${biz.id}`}>{biz.business_name}</Link></li>
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

const mapStateToProps = (state) => {
  return {
    dropDown: selectBusiness(Object.values(state.entities.businesses), state.entities.search.text)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdownResult: (searchtxt) => dispatch(getDropdownResult(searchtxt)),
    loadBusinesses: () => dispatch(loadBusinesses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);

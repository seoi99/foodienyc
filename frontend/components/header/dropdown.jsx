import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getSearchResult, getDropdownResult ,loadBusinesses} from '../../actions/business_actions'

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: "",
      location: "",
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidUpdate() {
    if (this.props.searchtxt !== this.state.searchStr) {
        this.setState({searchStr: this.props.searchtxt})
        this.props.getDropdownResult(this.props.searchtxt)
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    this.props.getSearchResult(e.target.innerText)
  }

  render() {
    const searched_bussinesses = this.props.searched_bussinesses;
    const bizCat = ["Japanese", "Korean", "Italian" ,"Burger", "Salad"]
      let bizArr;
      if (this.props.searchtxt !== "") {
        bizArr = searched_bussinesses.filter((biz, idx) => biz.business_name.toLowerCase().includes(this.props.searchtxt.toLowerCase()));
         bizArr = bizArr.map((biz, idx) => {
             return (
              <div key={idx} className="biz-dropdown">
                <li><Link to={`/businesses/${biz.id}`}>{biz.business_name}</Link></li>
              </div>
            )
        })
      }

  else if (this.props.searchtxt === "") {
    bizArr = bizCat.map((biz, idx) => {
      return  (
        <div key={idx} className="biz-dropdown">
          <li onClick={this.handleButtonClick}><Link to="/businesses">{biz}</Link></li>
        </div>
      )
    })
  }

  if (bizArr.length > 6) {
    bizArr = bizArr.slice(0,6)
  }

    return(
      <ul>
        {bizArr}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searched_bussinesses: state.entities.search
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResult: (searchtxt) => dispatch(getSearchResult(searchtxt)),
    getDropdownResult: (searchtxt) => dispatch(getDropdownResult(searchtxt)),
    loadBusinesses: () => dispatch(loadBusinesses()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);

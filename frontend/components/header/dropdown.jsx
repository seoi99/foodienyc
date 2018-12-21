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

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchtxt !== this.state.searchStr &&
        nextProps.searchtxt.length === 1) {
        this.setState({searchStr: nextProps.searchtxt})
        this.props.getDropdownResult(nextProps.searchtxt)
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    this.props.getSearchResult(e.target.innerText)
  }

  render() {
    const searched_bussinesses = this.props.searched_bussinesses;
    const bizCat = ["Japanese", "Korean", "Delivery","Fast Food", "Salad"]
      let bizArr;
      if (this.props.searchtxt !== "") {
         bizArr = searched_bussinesses.map((biz, idx) => {
           if (biz.business_name.toLowerCase().includes(this.props.searchtxt.toLowerCase())) {
            return (
              <div key={idx} className="biz-dropdown">
                <li><Link to={`/businesses/${biz.id}`}>{biz.business_name}</Link></li>
              </div>
            )
          }
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

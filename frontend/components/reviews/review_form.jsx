import React from 'react';
import Footer  from '../footer/footer';

import { withRouter, Link } from 'react-router-dom';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.review;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToDetails = this.navigateToDetails.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value});
    };
  }


  navigateToDetails() {
    const url = `/businesses/${this.props.match.params.businessId}`
    this.props.history.push(url);
  }


  handleSubmit(e) {
    e.preventDefault();
    const businessId = parseInt(this.props.match.params.businessId);
    const review = Object.assign({}, this.state, {business_id: businessId});
    this.props.action(review);
    this.navigateToDetails();
  }

  handleStarClick(e) {
    this.setState({rating: e.target.value})
  }

  renderErrors() {
    return(
      <ul className={"error"}>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>))}
      </ul>
    );
  }

  render() {
    if (this.props.review) {
      
    }
    const avgRateConversion = Array.from(Array(5).keys()).map((val, idx) => {
        let starcolor;
        if (idx < this.state.rating) {
          starcolor = `star-color-${this.state.rating}`
        } else {
          starcolor = `starcolor-default`
        }
        return <li className={`star ${starcolor}`} key={idx} value={idx + 1} onClick={this.handleStarClick} ></li>
      }
    );

    const formtype = this.props.formtype
    const review = this.props.review
    let evento;
    if (this.renderErrors) {
      evento = (this.props.errors)
    } else {
       evento = this.navigateToDetails();
    }
    if (review !== undefined) {

    return (
      <div>
      <div className="header-all">
        <Link to="/">Foodie</Link>
      </div>
        <form onSubmit={this.handleSubmit} className="review-form">
          <h1>{this.props.businessName}</h1>
          <div className="border-form">
            <ul>
            {avgRateConversion}
            </ul>
            <textarea value={this.state.body} onChange={this.update('body')} placeholder="Your review helps others learn about great local businesses."/>
          </div>
          <input type="submit" value={formtype}/>
        </form>
        <Footer />
      </div>
      )
  }
  else {
  return (<h1></h1>)
  }
}
}

export default withRouter(ReviewForm);

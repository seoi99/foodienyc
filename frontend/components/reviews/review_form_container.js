import { connect } from 'react-redux';
import { createReview } from '../../actions/business_actions.js';
import ReviewForm from './review_form';

const mapStateToProps = (state, ownProps) => {
  return {
    review : {body: '', rating: 0},
    errors: state.errors.review,
    businessName: state.entities.businesses[ownProps.match.params.businessId].business_name,
    formtype: "Post Review"
  }
}
const mapDispatchToProps = dispatch => {
  return {
  action:(review) => dispatch(createReview(review))
}};

export default connect(mapStateToProps ,mapDispatchToProps)(ReviewForm);

import React from 'react';
import Form from './form';

export default class UserPic extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.requestPhoto(this.props.userId)
  }

  handleClick() {
    this.props.deletePhoto(this.props.photo.id);
  }

  render() {
    let img = this.props.photo ? <img src={this.props.photo.photoUrl}/> : <img src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>
    let imgLoading;
    
    if (this.props.loading) {
      if (this.props.photoError.length > 0) {
        imgLoading = <img src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>
      }
      else {
        imgLoading = <div className='loading-img'></div>
      }
    }
    else {
      imgLoading = img
    }
    let button = this.props.photo ? <button className="delete-but" onClick={this.handleClick}>Delete</button> : null
    let photoError;
    if (this.props.photoError.length !== 0) {
      photoError = <div className="p-error"><h3><i className={`fa fa-exclamation-circle`} ></i> {this.props.photoError}</h3></div>
    }
    return (
      <div>
        <div className="prof-image">
          {imgLoading}
          {photoError}
          <div className="prof-1-2">
            {this.props.openUpload}
            {button}
          </div>
        </div>
      </div>
    )
  }
}

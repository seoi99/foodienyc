import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { uploadPicture } from '../../actions/user_pic_action';


class PicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photoFile: null,
      photoUrl: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({photoFile: file, photoUrl: fileReader.result})
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      console.log(formData);
      formData.append('user_picture[photo]', this.state.photoFile);

    }

    this.props.uploadPicture(formData)
    this.props.closeModal();
  }


  render() {
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl}/> : <img src="https://s3-media3.fl.yelpcdn.com/assets/srv0/yelp_styleguide/bf5ff8a79310/assets/img/default_avatars/user_medium_square.png"/>;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="picture-form">
          {preview}
          <input type="file"
            onChange={this.handleFile.bind(this)} className="file-chose"/>
          <input type="submit" value="Submit" className="prof-submit"/>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    uploadPicture: (formData) => dispatch(uploadPicture(formData)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(null, mapDispatchToProps)(PicForm)

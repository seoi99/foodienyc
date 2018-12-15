import React from 'react';
import { connect } from 'react-redux';
import { requestPhoto, deletePhoto, uploadPicture} from '../../actions/user_pic_action';
import { openModal, closeModal } from '../../actions/modal_actions';
import UserPic from './user_pic';


const mapStateToProps = (state) => {
  return {
    photo: state.entities.photos[state.session.currentUserId],
    userId: state.session.currentUserId,
    photoError: state.errors.photo,
    loading: state.ui.photos.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestPhoto: (id) => dispatch(requestPhoto(id)),
    uploadPicture: (formData) => dispatch(uploadPicture(formData)),
    deletePhoto: (id) => dispatch(deletePhoto(id)),
    openUpload: (
     <button onClick={() => dispatch(openModal('upload'))} className="modal-button">
       Upload a Photo
     </button>
   ),
   closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPic);

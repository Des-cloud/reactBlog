import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Modal = ({ journalID, token }) => {
  const history = useNavigate();
  const deletePost = async () => {
    await axios
      .delete(`/edit/${token}/${journalID}`)
      .then((res) => {
        if (res && res.status === 201) {
          console.log(res.data);
          history("/");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div
        className='modal fade'
        id='deleteModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='deleteModalTitle'
        aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='deleteModalTitle'>
                Confirm Delete
              </h5>
              <button
                style={{ background: "#1abc9c" }}
                type='button'
                className='btn close'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              Are you sure you want to delete this post?
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                data-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={deletePost}
                data-dismiss='modal'>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

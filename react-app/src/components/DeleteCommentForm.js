import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentThunk } from "../store/posts";

const DeleteCommentForm = ({ setShowModal, comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const no = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  const yes = async (e) => {
    await dispatch(deleteCommentThunk(comment.id, user.username));
  };
  return (
    <div id="comment-delete-prompt-container">
      <label id="comment-delete-prompt-label">Delete Comment:</label>
      <div id="comment-delete-prompt-message">{comment.description}</div>
      <button onClick={no} id="comment-no-delete" className="nav-btn-btn">
        Cancel
      </button>
      <button onClick={yes} id="comment-yes-delete" className="nav-btn-btn">
        Delete
      </button>
    </div>
  );
};

export default DeleteCommentForm;

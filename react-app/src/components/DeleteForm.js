import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deletePostThunk } from "../store/posts";

const DeleteForm = () => {
  const { communityId, postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const no = (e) => {
    e.preventDefault();
    history.push(`/communities/${communityId}/posts/${postId}`);
  };
  const yes = async (e) => {
    await dispatch(deletePostThunk(communityId, postId, user.username));
    history.push(`/communities/${communityId}/posts/${postId}`);
  };
  return (
    <div id="delete-prompt-container">
      <div id="delete-prompt-message">
        When you delete your Post, only the content of the post will be erased.
        Are you sure you want to delete this post?
      </div>
      <button onClick={no} id="no-delete" className="nav-btn-btn">
        Cancel
      </button>
      <button onClick={yes} id="yes-delete" className="nav-btn-btn">
        Delete
      </button>
    </div>
  );
};

export default DeleteForm;

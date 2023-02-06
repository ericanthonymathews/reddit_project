import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";
import {
  addVoteThunk,
  editVoteThunk,
  deleteVoteThunk,
} from "../../store/votes";
import {
  addVoteToHomeThunk,
  addVoteToCommunityThunk,
  addVoteToDetailsThunk,
} from "../../store/posts";

function LikeButtonsModal({ post, page }) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  const votesByPostId = useSelector((state) => state.votes.votesByPostId);
  const dispatch = useDispatch();

  const downvote = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowModal(true);
    } else {
      if (!votesByPostId[post.id]) {
        await dispatch(addVoteThunk(post.id, -1));
      } else {
        if (votesByPostId[post.id].value === -1) {
          await dispatch(deleteVoteThunk(votesByPostId[post.id].id, post.id));
        } else {
          await dispatch(editVoteThunk(votesByPostId[post.id].id, -1));
        }
      }
      if (page === "home") {
        await dispatch(addVoteToHomeThunk(post.id));
      }
      if (page === "community") {
        await dispatch(addVoteToCommunityThunk(post.id));
      }
      if (page === "details") {
        await dispatch(addVoteToDetailsThunk(post.id));
      }
    }
  };
  const upvote = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowModal(true);
    } else {
      if (!votesByPostId[post.id]) {
        await dispatch(addVoteThunk(post.id, 1));
      } else {
        if (votesByPostId[post.id].value === 1) {
          await dispatch(deleteVoteThunk(votesByPostId[post.id].id, post.id));
        } else {
          await dispatch(editVoteThunk(votesByPostId[post.id].id, 1));
        }
      }
      if (page === "home") {
        await dispatch(addVoteToHomeThunk(post.id));
      }
      if (page === "community") {
        await dispatch(addVoteToCommunityThunk(post.id));
      }
      if (page === "details") {
        await dispatch(addVoteToDetailsThunk(post.id));
      }
    }
  };
  if (
    !user ||
    !Object.values(votesByPostId).length > 0 ||
    votesByPostId[post.id] === undefined
  ) {
    return (
      <div className="flex-row space-between marginp5em">
        <button onClick={upvote} className="nav-btn-btn">
          Upvote
        </button>
        <div className="margin1em">{post.votes.length}</div>
        <button onClick={downvote} className="nav-btn-btn">
          Downvote
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    );
  } else if (votesByPostId[post.id].value === -1) {
    return (
      <div className="flex-row space-between marginp5em">
        <button onClick={upvote} className="nav-btn-btn">
          Upvote
        </button>
        <div className="margin1em">{post.votes.length}</div>
        <button onClick={downvote} className="nav-btn-btn red">
          Downvote
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    );
  } else if (votesByPostId[post.id].value === 1) {
    return (
      <div className="flex-row space-between marginp5em">
        <button onClick={upvote} className="nav-btn-btn red">
          Upvote
        </button>
        <div className="margin1em">{post.votes.length}</div>
        <button onClick={downvote} className="nav-btn-btn">
          Downvote
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    );
  }
}

export default LikeButtonsModal;

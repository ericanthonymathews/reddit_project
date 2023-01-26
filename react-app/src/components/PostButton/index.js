import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";
import { createNewPostThunk } from "../../store/posts";

function PostButton() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const user = useSelector((state) => state.session.user);
  // FORM DATA STATE
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const activateForm = (e) => {
    setShowForm(true);
  };

  const createPost = async (e) => {
    e.preventDefault();
    const data = await dispatch(createNewPostThunk(communityId, title, body));
    if (data) {
      setErrors(data);
    } else {
      setTitle("");
      setBody("");
      setShowForm(false);
    }
  };

  const cancel = (e) => {
    setTitle("");
    setBody("");
    setShowForm(false);
  };

  // FORM FUNCTIONS FOR SETTING DATA
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateBody = (e) => {
    setBody(e.target.value);
  };

  if (!user) {
    return (
      <>
        <button onClick={() => setShowModal(true)}>Post</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  } else if (!showForm) {
    return <button onClick={activateForm}>Post</button>;
  } else {
    return (
      <form onSubmit={createPost}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={updateTitle}
            value={title}
          ></input>
        </div>
        <div>
          <label>Body</label>
          <input
            type="text"
            name="body"
            onChange={updateBody}
            value={body}
          ></input>
        </div>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default PostButton;

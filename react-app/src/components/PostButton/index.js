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
  const [titleErrors, setTitleErrors] = useState([]);
  const [bodyErrors, setBodyErrors] = useState([]);
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
      const tErrors = [];
      const bErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        if (fieldsAndErrors[0] === "title ") {
          tErrors.push(error);
        }
        if (fieldsAndErrors[0] === "body ") {
          bErrors.push(error);
        }
      });
      setTitleErrors(tErrors);
      setBodyErrors(bErrors);
      setErrors(data);
    } else {
      setTitle("");
      setBody("");
      setShowForm(false);
    }
  };

  const cancel = (e) => {
    e.preventDefault();
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
        <button
          onClick={() => setShowModal(true)}
          id="add-post-btn"
          className="nav-btn-btn"
        >
          Post
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  } else if (!showForm) {
    return (
      <button onClick={activateForm} id="add-post-btn" className="nav-btn-btn">
        Post
      </button>
    );
  } else {
    return (
      <form onSubmit={createPost}>
        {/* <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div>
          {titleErrors.map((error, ind) => (
            <div key={`title-${ind}`} className="error-text">
              {error}
            </div>
          ))}
        </div>
        <label>Title*</label>
        <div>
          <textarea
            // type="textarea"
            rows="4"
            cols="80"
            className="form-textarea"
            name="title"
            onChange={updateTitle}
            value={title}
          ></textarea>
        </div>
        <div>
          {bodyErrors.map((error, ind) => (
            <div key={`body-${ind}`} className="error-text">
              {error}
            </div>
          ))}
        </div>
        <label>Body*</label>
        <div>
          <textarea
            // type="text"
            name="body"
            rows="8"
            cols="80"
            className="form-textarea"
            onChange={updateBody}
            value={body}
          ></textarea>
        </div>
        <button className="nav-btn-btn" onClick={cancel}>
          Cancel
        </button>
        <button type="submit" className="nav-btn-btn">
          Submit
        </button>
      </form>
    );
  }
}

export default PostButton;

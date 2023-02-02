import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";
import { addCommentThunk } from "../../store/posts";

function CommentForm() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.session.user);
  // FORM DATA STATE
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState("");

  const createComment = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowModal(true);
    } else {
      const data = await dispatch(addCommentThunk(postId, description));
      if (data) {
        console.log("~~~~~~~~~~~~~~~~~~~~DATA", data);
        const dErrors = [];
        data.forEach((error) => {
          let fieldsAndErrors = error.split(":");
          dErrors.push(fieldsAndErrors[1]);
        });
        setErrors(dErrors);
      } else {
        setDescription("");
      }
    }
  };

  // FORM FUNCTIONS FOR SETTING DATA
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form onSubmit={createComment}>
      <div>
        <div>
          {errors.map((error, ind) => (
            <div key={`comment-create-error-${ind}`} className="error-text">
              {error}
            </div>
          ))}
        </div>
        <textarea
          // type="textarea"
          rows="10"
          cols="67"
          className="form-textarea comment-formarea"
          name="description"
          onChange={updateDescription}
          value={description}
        ></textarea>
      </div>
      <button type="submit" id="comment-btn-btn" className="nav-btn-btn">
        Add Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </form>
  );
}

export default CommentForm;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCommentThunk } from "../store/posts";
import DeleteCommentModal from "./DeleteCommentModal";

const CommentCard = ({ comment, post }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [description, setDescription] = useState(comment.description);
  const user = useSelector((state) => state.session.user);

  const cancel = (e) => {
    e.preventDefault();
    setDescription(comment.description);
    setShowEdit(false);
  };
  const startEdit = (e) => {
    e.preventDefault();
    setShowEdit(!showEdit);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const editDescription = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      editCommentThunk(comment.id, description, user.username)
    );
    if (data) {
      let dErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        dErrors.push(fieldsAndErrors[1]);
      });
      setErrors(dErrors);
      setDescription(comment.description);
    } else {
      setShowEdit(false);
    }
  };

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-maker">
          Posted by u/{comment.username} on {comment.created_at}
        </div>
      </div>
      {!showEdit &&
        user &&
        user.id === comment.user_id &&
        !comment.is_deleted && (
          <button className="nav-btn-btn" onClick={startEdit}>
            Edit
          </button>
        )}
      {!showEdit &&
        user &&
        user.id === comment.user_id &&
        !comment.is_deleted && <DeleteCommentModal comment={comment} />}
      {comment.user_id === post.user_id && (
        <div className="comment-is-op">
          <i class="fa-solid fa-star"></i> OP
        </div>
      )}
      {showEdit && (
        <form onSubmit={editDescription}>
          <div>
            {errors.map((error, ind) => (
              <div key={`errors-comment-${ind}`} className="error-text">
                {error}
              </div>
            ))}
          </div>
          <div>
            <textarea
              rows="10"
              cols="64"
              className="form-textarea"
              type="text"
              name="body"
              onChange={updateDescription}
              value={description}
            ></textarea>
          </div>
          <button className="nav-btn-btn" onClick={cancel}>
            Cancel
          </button>
          <button type="submit" className="nav-btn-btn">
            Submit
          </button>
        </form>
      )}
      {!showEdit && (
        <div className="comment-description">{comment.description}</div>
      )}
      {!comment.is_deleted && comment.updated_at !== comment.created_at && (
        <div>
          * edited by {comment.edited_by} on {comment.updated_at}
        </div>
      )}
      {comment.is_deleted && (
        <div>
          * deleted by {comment.edited_by} on {comment.updated_at}
        </div>
      )}
    </div>
  );
};
export default CommentCard;

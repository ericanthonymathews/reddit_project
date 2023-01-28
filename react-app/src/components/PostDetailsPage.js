import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCommunityPosts,
  getOnePostThunk,
  editPostThunk,
} from "../store/posts";
import { clearCommunity, getCommunityThunk } from "../store/communities";
const PostDetailsPage = () => {
  const [errors, setErrors] = useState([]);
  const [body, setBody] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const { communityId, postId } = useParams();
  const user = useSelector((state) => state.session.user);
  const community = useSelector((state) => state.communities.singleCommunity);
  const post = useSelector((state) => state.posts.singlePost);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePostThunk(postId));
    dispatch(getCommunityThunk(communityId));
  }, [dispatch, communityId, postId]);

  const navToCommunity = (e) => {
    e.preventDefault();
    dispatch(clearCommunityPosts());
    dispatch(clearCommunity());
    history.push(`/communities/${post.community_id}`);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const cancel = (e) => {
    setBody(post.body);
    setShowEdit(false);
  };

  const startEdit = (e) => {
    e.preventDefault();
    setBody(post.body);
    setShowEdit(!showEdit);
  };

  const editBody = async (e) => {
    e.preventDefault();
    const data = await dispatch(
      editPostThunk(community.id, post.id, user.username, body)
    );
    if (data) {
      setErrors(data);
    } else {
      setBody(post.body);
      setShowEdit(false);
    }
  };

  const NavToDelete = (e) => {
    e.preventDefault();
    history.push(`/communities/${communityId}/posts/${postId}/delete`);
  };

  return (
    <>
      <div id="single-post-details-page">
        <div className="single-post-details">
          <div className="modular-header">
            <div className="post-community-link" onClick={navToCommunity}>
              r/{post.community_name}
            </div>
            <div className="post-maker">
              posted by u/{post.username} on {post.created_at}
            </div>
          </div>
          <div className="single-post-title">{post.title}</div>

          {user &&
            Object.values(post).length > 0 &&
            !post.is_deleted &&
            user.id === post.user_id && (
              <>
                <button className="edit-post-btn" onClick={startEdit}>
                  Edit
                </button>
                <button onClick={NavToDelete} id="delete-nav-btn">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </>
            )}
          {showEdit && (
            <form onSubmit={editBody}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
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
          )}
          {!showEdit && <div className="single-post-body">{post.body}</div>}
          {!post.is_deleted && post.edited_by && (
            <div>
              * edited by {post.edited_by} on {post.updated_at}
            </div>
          )}
          {/* {post.is_deleted && !showEdit && (
          <div className="single-post-body">{post.body}</div>
        )} */}
          {post.is_deleted && post.edited_by && (
            <div>
              * deleted by {post.edited_by} on {post.updated_at}
            </div>
          )}
        </div>
        <div className="single-post-community-feed-header">
          <div
            className="single-post-feed-header-name"
            onClick={navToCommunity}
          >
            r/{community.name}
          </div>
          <div className="single-post-community-feed-header-about">
            {community.about}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsPage;

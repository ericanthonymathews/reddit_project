import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearCommunityPosts, clearSinglePost } from "../store/posts";
import { clearCommunity } from "../store/communities";
import LikeButtonsModal from "./LikeButtonsModal";

const PostCard = ({ post, atHomePage = false }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let page;

  if (atHomePage) {
    page = "home";
  } else {
    page = "community";
  }

  const navToCommunity = (e) => {
    e.preventDefault();
    dispatch(clearCommunityPosts());
    dispatch(clearCommunity());
    history.push(`/communities/${post.community_id}`);
  };

  const navToPost = (e) => {
    e.preventDefault();
    dispatch(clearSinglePost());
    dispatch(clearCommunity());
    history.push(`/communities/${post.community_id}/posts/${post.id}`);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="modular-header">
          {atHomePage && (
            <div className="post-community-link" onClick={navToCommunity}>
              r/{post.community_name}
            </div>
          )}
          <div className="post-maker">
            Posted by u/{post.username} on {post.created_at}
          </div>
        </div>
      </div>
      <div className="post-title" onClick={navToPost}>
        {post.title}
      </div>
      <div className="flex-row space-between">
        <div className="post-card-comments">
          <i className="fa-regular fa-message"></i> {post.comments.length}{" "}
          Comments
        </div>
        <LikeButtonsModal post={post} page={page} />
      </div>
    </div>
  );
};

export default PostCard;

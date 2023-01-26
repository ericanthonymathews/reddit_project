import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearCommunityPosts,
  getSinglePostFromAllPosts,
  getSinglePostFromCommunityPosts,
} from "../store/posts";
import { clearCommunity } from "../store/communities";

const PostCard = ({ post, atHomePage = false }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const navToCommunity = (e) => {
    e.preventDefault();
    dispatch(clearCommunityPosts());
    dispatch(clearCommunity());
    history.push(`/communities/${post.community_id}`);
  };

  const navToPost = (e) => {
    e.preventDefault();
    if (atHomePage) {
      dispatch(getSinglePostFromAllPosts(post.id));
    } else {
      dispatch(getSinglePostFromCommunityPosts(post.id));
    }
    history.push(`/communities/${post.community_id}/posts/${post.id}`);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        {atHomePage && (
          <div className="post-community link" onClick={navToCommunity}>
            r/{post.community_name}
          </div>
        )}
        {!atHomePage && (
          <div className="post-community">b/{post.community_name}</div>
        )}
        <div className="post-maker">
          Posted by u/{post.username} on {post.created_at}
        </div>
      </div>
      <div className="post-title" onClick={navToPost}>
        {post.title}
      </div>
    </div>
  );
};

export default PostCard;

import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCommunityPosts } from "../store/posts";
import { clearCommunity } from "../store/communities";

const PostDetailsPage = () => {
  const community = useSelector((state) => state.communities.singleCommunity);
  const post = useSelector((state) => state.posts.singlePost);
  const history = useHistory();
  const dispatch = useDispatch();

  const navToCommunity = (e) => {
    e.preventDefault();
    dispatch(clearCommunityPosts());
    dispatch(clearCommunity());
    history.push(`/communities/${post.community_id}`);
  };

  return (
    <>
      <div className="single-post-details">
        <div className="single-post-title">{post.title}</div>

        <div className="post-maker">
          Posted by u/{post.username} on {post.created_at} to
        </div>
        <div className="post-community link" onClick={navToCommunity}>
          r/{post.community_name}
        </div>
        <div className="single-post-body">{post.body}</div>
      </div>
      <div className="community-feed-header">
        <div className="single-post-feed-header-name" onClick={navToCommunity}>
          r/{community.name}
        </div>
        <div className="community-feed-header-header">{community.header}</div>
        <div className="community-feed-header-about">{community.about}</div>
      </div>
    </>
  );
};

export default PostDetailsPage;

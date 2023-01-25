import { useHistory } from "react-router-dom";

const PostCard = ({ post, atHomePage = false }) => {
  const history = useHistory();
  const navToCommunity = (e) => {
    e.preventDefault();
    history.push(`/communities/${post.community_id}`);
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
          <div className="post-community">r/{post.community_name}</div>
        )}
        <div className="post-maker">
          Posted by u/{post.username} {post.created_at}
        </div>
      </div>
      <div className="post-title">{post.title}</div>
    </div>
  );
};

export default PostCard;

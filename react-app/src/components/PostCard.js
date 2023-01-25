const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-community">r/{post.community_name}</div>
        <div className="post-maker">
          Posted by u/{post.username} {post.created_at}
        </div>
      </div>
      <div className="post-title">{post.title}</div>
    </div>
  );
};

export default PostCard;

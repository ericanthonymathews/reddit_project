import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../store/posts";
import PostCard from "./PostCard";

const Feed = () => {
  const allPosts = useSelector((state) => state.posts.allPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);
  return (
    <div className="feed">
      {Object.values(allPosts).map((post) => (
        <PostCard post={post} key={`feed-postcard-${post.id}`} />
      ))}
    </div>
  );
};

export default Feed;

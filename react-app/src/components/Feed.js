import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsThunk } from "../store/posts";
import PostCard from "./PostCard";
import PopularCommunities from "./PopularCommunities";

const Feed = () => {
  const allPosts = useSelector((state) => state.posts.allPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);
  return (
    <div className="flex-row">
      <div className="home-feed">
        {Object.values(allPosts).map((post) => (
          <PostCard
            post={post}
            atHomePage={true}
            key={`feed-postcard-${post.id}`}
          />
        ))}
      </div>
      <PopularCommunities />
      <div className="filler" />
    </div>
  );
};

export default Feed;

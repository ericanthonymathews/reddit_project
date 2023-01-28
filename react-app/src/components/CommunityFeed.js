import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityPostsThunk } from "../store/posts";
import { getCommunityThunk } from "../store/communities";
import PostCard from "./PostCard";
import PostButton from "./PostButton";

const CommunityFeed = () => {
  const communityPosts = useSelector((state) => state.posts.communityPosts);
  const community = useSelector((state) => state.communities.singleCommunity);
  const { communityId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunityPostsThunk(communityId));
    dispatch(getCommunityThunk(communityId));
  }, [dispatch, communityId]);
  return (
    <>
      <>
        <div id="community-feed">
          <>
            {Object.values(community).length > 0 && (
              <div className="community-feed-header">
                <div className="community-feed-header-header">
                  {community.header}
                </div>
                <div className="community-feed-header-name">
                  r/{community.name}
                </div>
                <div className="community-feed-header-about">
                  {community.about}
                </div>
                <PostButton />
              </div>
            )}
          </>
          {Object.values(communityPosts).length > 0 && (
            <div className="feed">
              {Object.values(communityPosts).map((post) => (
                <PostCard post={post} key={`feed-postcard-${post.id}`} />
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
};

export default CommunityFeed;

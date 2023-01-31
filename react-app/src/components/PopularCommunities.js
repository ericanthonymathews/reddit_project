import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearCommunityPosts } from "../store/posts";
import { getAllCommunitiesThunk, clearCommunity } from "../store/communities";

const PopularCommunities = () => {
  const allCommunities = useSelector(
    (state) => state.communities.allCommunities
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllCommunitiesThunk());
  }, [dispatch]);
  return (
    <>
      {Object.values(allCommunities).length > 0 && (
        <div id="popular-communities">
          <label id="pop-com-header">Popular Communities</label>
          {Object.values(allCommunities).map((community) => (
            <div
              key={`pop-com-${community.name}`}
              className="pop-com-link"
              onClick={async () => {
                await dispatch(clearCommunity());
                await dispatch(clearCommunityPosts());
                history.push(`/communities/${community.id}`);
              }}
            >
              {community.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PopularCommunities;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCommunitiesThunk } from "../store/communities";

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
      <div id="popular-communities">
        <label id="pop-com-header">Popular Communities</label>
        {Object.values(allCommunities).map((community) => (
          <div
            key={`pop-com-${community.name}`}
            className="pop-com-link"
            onClick={() => history.push(`/communities/${community.id}`)}
          >
            {community.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularCommunities;

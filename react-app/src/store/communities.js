const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";
const LOAD_COMMUNITY = "communities/LOAD_COMMUNITY";
const CLEAR_COMMUNITY = "communities/CLEAR_COMMUNITY";

// ACTION CREATOR
const loadCommunities = (communities) => ({
  type: LOAD_COMMUNITIES,
  communities,
});

const loadCommunity = (community) => ({
  type: LOAD_COMMUNITY,
  community,
});

export const clearCommunity = () => ({
  type: CLEAR_COMMUNITY,
});

// THUNK ACTION CREATOR
export const getCommunityThunk = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadCommunity(data));
  }
};

export const getAllCommunitiesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/communities/`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadCommunities(data.communities));
  }
};

// INITIAL STATE uwu
const initialState = { singleCommunity: {}, allCommunities: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITIES: {
      const newState = {
        allCommunities: {},
        singleCommunity: state.singleCommunity,
      };
      action.communities.forEach((community) => {
        newState.allCommunities[community.id] = community;
      });
      return newState;
    }
    case LOAD_COMMUNITY: {
      const newState = {
        allCommunities: { ...state.allCommunities },
        singleCommunity: {},
      };
      newState.singleCommunity = action.community;
      return newState;
    }
    case CLEAR_COMMUNITY: {
      const newState = {
        allCommunities: { ...state.allCommunities },
        singleCommunity: {},
      };
      return newState;
    }
    default:
      return state;
  }
}

const LOAD_COMMUNITY = "communities/LOAD_COMMUNITY";
const CLEAR_COMMUNITY = "communities/CLEAR_COMMUNITY";

// ACTION CREATOR
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

// INITIAL STATE uwu
const initialState = { singleCommunity: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMUNITY: {
      const newState = {
        singleCommunity: {},
      };
      newState.singleCommunity = action.community;
      return newState;
    }
    case CLEAR_COMMUNITY: {
      const newState = {
        singleCommunity: {},
      };
      return newState;
    }
    default:
      return state;
  }
}

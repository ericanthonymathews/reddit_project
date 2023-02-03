const LOAD_COMMUNITIES = "communities/LOAD_COMMUNITIES";
const LOAD_COMMUNITY = "communities/LOAD_COMMUNITY";
const CLEAR_COMMUNITY = "communities/CLEAR_COMMUNITY";
const ADD_COMMUNITY = "communities/ADD_COMMUNITY";
const EDIT_COMMUNITY = "communities/EDIT_COMMUNITY";

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

const addCommunity = (community) => ({
  type: ADD_COMMUNITY,
  community,
});

const editCommunity = (community) => ({
  type: EDIT_COMMUNITY,
  community
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

export const createNewCommunityThunk =
  (name, header, about) => async (dispatch) => {
    const response = await fetch(`/api/communities/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        header,
        about,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      await dispatch(addCommunity(data));
      return data.id;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again"];
    }
  };

export const editCommunityThunk = (communityId, header, about) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      header,
      about
    }),
  });

  if (response.ok) {
    const data = await response.json;
    await dispatch(editCommunity(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ["An error occurred. Please try again"];
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
    case ADD_COMMUNITY: {
      const newState = {
        allCommunities: { ...state.allCommunities },
        singleCommunity: action.community,
      };
      newState.allCommunities[action.community.id] = action.community;
      return newState;
    }
    case EDIT_COMMUNITY: {
      const newState = {
        allCommunities: { ...state.allCommunities },
        singleCommunity: action.community,
      };
      newState.allCommunities[action.community.id] = action.community;
      return newState;
    }
    default:
      return state;
  }
}

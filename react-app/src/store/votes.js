// constants
const LOAD_USER_POST_VOTES = "votes/LOAD_USER_POST_VOTES";
const CLEAR_USER_POST_VOTES = "votes/CLEAR_USER_POST_VOTES";
const ADD_VOTE = "votes/ADD_VOTE";
const EDIT_VOTE = "votes/EDIT_VOTE";
const DELETE_VOTE = "votes/DELETE_VOTE";
// ACTION CREATORS
const loadUserPostVotes = (votes) => ({
  type: LOAD_USER_POST_VOTES,
  votes,
});

export const clearUserPostVotes = () => ({
  type: CLEAR_USER_POST_VOTES,
});

const addVote = (vote) => ({
  type: ADD_VOTE,
  vote,
});

const editVote = (vote) => ({
  type: EDIT_VOTE,
  vote,
});

const deleteVote = (id) => ({
  type: DELETE_VOTE,
  id,
});

// THUNK ACTION CREATORS
export const getUserPostVotesThunk = () => async (dispatch) => {
  const response = await fetch(`/api/votes/`);
  if (response.ok) {
    const data = await response.json();
    if (data.votes) {
      await dispatch(loadUserPostVotes(data.votes));
    }
    return null;
  }
  return null;
};

export const addVoteThunk = (post_id, value) => async (dispatch) => {
  const response = await fetch(`/api/votes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id,
      value,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addVote(data));
    return null;
  }
  return null;
};

export const editVoteThunk = (id, value) => async (dispatch) => {
  const response = await fetch(`/api/votes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    await dispatch(editVote(data));
    return null;
  }
};

export const deleteVoteThunk = (voteId, postId) => async (dispatch) => {
  const response = await fetch(`/api/votes/${voteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    await dispatch(deleteVote(postId));
    return null;
  }
};

// INITIAL STATE
const initialState = { votesByPostId: {} };

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_POST_VOTES: {
      const newState = {
        votesByPostId: {},
      };
      action.votes.forEach((vote) => {
        newState.votesByPostId[vote.post_id] = vote;
      });
      return newState;
    }
    case ADD_VOTE: {
      const newState = {
        votesByPostId: { ...state.votesByPostId },
      };
      newState.votesByPostId[action.vote.post_id] = action.vote;
      return newState;
    }
    case EDIT_VOTE: {
      const newState = {
        votesByPostId: { ...state.votesByPostId },
      };
      newState.votesByPostId[action.vote.post_id] = action.vote;
      return newState;
    }
    case DELETE_VOTE: {
      const newState = {
        votesByPostId: { ...state.votesByPostId },
      };
      delete newState.votesByPostId[action.id];
      return newState;
    }
    case CLEAR_USER_POST_VOTES: {
      const newState = { votesByPostId: {} };
      return newState;
    }
    default:
      return state;
  }
}

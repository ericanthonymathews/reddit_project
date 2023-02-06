const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_SINGLE_POST = "posts/LOAD_SINGLE_POST";
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS";
const ADD_POST = "posts/ADD_POST";
const EDIT_POST = "posts/EDIT_POST";
const ADD_POST_COMMENT = "/posts/ADD_POST_COMMENT";
const EDIT_POST_COMMENT = "posts/EDIT_POST_COMMENT";
const ADD_VOTE_TO_HOME = "posts/ADD_VOTE_TO_HOME";
const ADD_VOTE_TO_COMMUNITY = "posts/ADD_VOTE_TO_COMMUNITY";
const ADD_VOTE_TO_DETAILS = "posts/ADD_VOTE_TO_DETAILS";
const CLEAR_COMMUNITY_POSTS = "posts/CLEAR_COMMUNITY_POSTS";
const CLEAR_SINGLE_POST = "posts/CLEAR_SINGLE_POST";

// ACTION CREATOR
const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const loadSinglePost = (post) => ({
  type: LOAD_SINGLE_POST,
  post,
});

const loadCommunityPosts = (posts) => ({
  type: LOAD_COMMUNITY_POSTS,
  posts,
});

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

const addComment = (post) => ({
  type: ADD_POST_COMMENT,
  post,
});

const editPostComment = (post) => ({
  type: EDIT_POST_COMMENT,
  post,
});

const addVoteToHome = (post) => ({
  type: ADD_VOTE_TO_HOME,
  post,
});

const addVoteToDetails = (post) => ({
  type: ADD_VOTE_TO_DETAILS,
  post,
});

const addVoteToCommunity = (post) => ({
  type: ADD_VOTE_TO_COMMUNITY,
  post,
});

export const clearCommunityPosts = () => ({
  type: CLEAR_COMMUNITY_POSTS,
});

export const clearSinglePost = () => ({
  type: CLEAR_SINGLE_POST,
});

// THUNK ACTION CREATOR
export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadPosts(data.posts));
  }
};

export const getOnePostThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadSinglePost(data));
  }
};

export const getCommunityPostsThunk = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/communities/${communityId}/posts`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadCommunityPosts(data.posts));
  }
};

export const createNewPostThunk =
  (communityId, title, body) => async (dispatch) => {
    const response = await fetch(`/api/communities/${communityId}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addPost(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again"];
    }
  };

export const editPostThunk =
  (communityId, postId, edited_by, body) => async (dispatch) => {
    const response = await fetch(
      `/api/communities/${communityId}/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body,
          edited_by,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(editPost(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again"];
    }
  };

export const addCommentThunk = (post_id, description) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      post_id,
    }),
  }); //////// NEED TO MAKE ROUTE, then handle data
  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["an error occurred. Please try again"];
  }
};

export const editCommentThunk =
  (commentId, description, edited_by) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        edited_by,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(editPostComment(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again"];
    }
  };
export const deleteCommentThunk =
  (commentId, edited_by) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "[ DELETED ]",
        edited_by,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(editPostComment(data));
      return null;
    } else if (response.status < 500) {
      const data = response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again"];
    }
  };

export const deletePostThunk =
  (communityId, postId, edited_by, body) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: "[ DELETED ]",
        edited_by,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(editPost(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occured. Please try again"];
    }
  };

export const addVoteToHomeThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(addVoteToHome(data));
  }
};

export const addVoteToCommunityThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(addVoteToCommunity(data));
  }
};

export const addVoteToDetailsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);
  if (response.ok) {
    const data = await response.json();
    await dispatch(addVoteToDetails(data));
  }
};
// INITIAL STATE
const initialState = { allPosts: {}, communityPosts: {}, singlePost: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      const newState = {
        allPosts: {},
        communityPosts: { ...state.communityPosts },
        singlePost: state.singlePost,
      };
      action.posts.forEach((post) => {
        newState.allPosts[post.id] = post;
      });
      return newState;
    }
    case LOAD_SINGLE_POST: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: action.post,
      };
      return newState;
    }
    case LOAD_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: {},
        singlePost: { ...state.singlePost },
      };
      action.posts.forEach((post) => {
        newState.communityPosts[post.id] = post;
      });
      return newState;
    }
    case ADD_POST: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: { ...state.singlePost },
      };
      newState.allPosts[action.post.id] = action.post;
      newState.communityPosts[action.post.id] = action.post;
      return newState;
    }
    case CLEAR_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: {},
        singlePost: { ...state.singlePost },
      };
      return newState;
    }
    case CLEAR_SINGLE_POST: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: {},
      };
      return newState;
    }
    case ADD_POST_COMMENT: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: action.post,
      };
      return newState;
    }
    case EDIT_POST: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: action.post,
      };
      newState.allPosts[action.post.id] = action.post;
      newState.communityPosts[action.post.id] = action.post;
      return newState;
    }
    case EDIT_POST_COMMENT: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: action.post,
      };
      return newState;
    }
    case ADD_VOTE_TO_HOME: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: state.singlePost,
      };
      newState.allPosts[action.post.id] = action.post;
      return newState;
    }
    case ADD_VOTE_TO_COMMUNITY: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: state.singlePost,
      };
      newState.communityPosts[action.post.id] = action.post;
      return newState;
    }
    case ADD_VOTE_TO_DETAILS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: action.post,
      };
      return newState;
    }
    default:
      return state;
  }
}

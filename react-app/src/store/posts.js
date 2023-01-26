const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS";
const ADD_POST = "posts/ADD_POST";
const CLEAR_COMMUNITY_POSTS = "posts/CLEAR_COMMUNITY_POSTS";
const GET_SINGLE_POST_FROM_ALL_POSTS = "posts/GET_SINGLE_POST_FROM_ALL_POSTS";
const GET_SINGLE_POST_FROM_COMMUNITY_POSTS =
  "posts/GET_SINGLE_POST_FROM_COMMUNITY_POSTS";

// ACTION CREATOR
const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const loadCommunityPosts = (posts) => ({
  type: LOAD_COMMUNITY_POSTS,
  posts,
});

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const clearCommunityPosts = () => ({
  type: CLEAR_COMMUNITY_POSTS,
});

export const getSinglePostFromAllPosts = (id) => ({
  type: GET_SINGLE_POST_FROM_ALL_POSTS,
  id,
});
export const getSinglePostFromCommunityPosts = (id) => ({
  type: GET_SINGLE_POST_FROM_COMMUNITY_POSTS,
  id,
});

// THUNK ACTION CREATOR
export const getAllPostsThunk = () => async (dispatch) => {
  const response = await fetch("/api/posts/");
  if (response.ok) {
    const data = await response.json();
    await dispatch(loadPosts(data.posts));
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
      return ["An error occured. Please try again"];
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
    case LOAD_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: {},
        singlePost: state.singlePost,
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
        singlePost: state.singlePost,
      };
      newState.allPosts[action.post.id] = action.post;
      newState.communityPosts[action.post.id] = action.post;
      return newState;
    }
    case CLEAR_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: {},
        singlePost: state.singlePost,
      };
      return newState;
    }
    case GET_SINGLE_POST_FROM_ALL_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: {},
      };
      newState.singlePost = newState.allPosts[action.id];
      return newState;
    }
    case GET_SINGLE_POST_FROM_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...state.allPosts },
        communityPosts: { ...state.communityPosts },
        singlePost: {},
      };
      newState.singlePost = newState.communityPosts[action.id];
      return newState;
    }
    default:
      return state;
  }
}

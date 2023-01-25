const LOAD_POSTS = "posts/LOAD_POSTS";
const LOAD_COMMUNITY_POSTS = "posts/LOAD_COMMUNITY_POSTS";

// ACTION CREATOR
const loadPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const loadCommunityPosts = (posts) => ({
  type: LOAD_COMMUNITY_POSTS,
  posts,
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
// INITIAL STATE
const initialState = { allPosts: {}, communityPosts: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS: {
      const newState = {
        allPosts: {},
        communityPosts: { ...state.communityPosts },
      };
      action.posts.forEach((post) => {
        newState.allPosts[post.id] = post;
      });
      return newState;
    }
    case LOAD_COMMUNITY_POSTS: {
      const newState = {
        allPosts: { ...action.communityPosts },
        communityPosts: {},
      };
      action.posts.forEach((post) => {
        newState.communityPosts[post.id] = post;
      });
      return newState;
    }
    default:
      return state;
  }
}

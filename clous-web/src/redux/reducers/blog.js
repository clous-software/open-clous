import {
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_LIST_FAIL,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAIL,
  GET_BLOG_LIST_CATEGORIES_SUCCESS,
  GET_BLOG_LIST_CATEGORIES_FAIL,
  GET_SEARCH_BLOG_SUCCESS,
  GET_SEARCH_BLOG_FAIL,
} from "../actions/blog/types";

const initialState = {
  blog_list: null,
  blog_list_category: null,
  filtered_posts: null,
  post: null,
};

export default function blog(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOG_LIST_CATEGORIES_SUCCESS:
      return {
        ...state,
        blog_list_category: payload.results.posts,

      };
    case GET_BLOG_LIST_CATEGORIES_FAIL:
      return {
        ...state,
        blog_list_category: null,

      };
    case GET_BLOG_LIST_SUCCESS:
      return {
        ...state,
        blog_list: payload.results.posts,

      };
    case GET_BLOG_LIST_FAIL:
      return {
        ...state,
        blog_list: null,

      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        post: payload.post,
      };
    case GET_BLOG_FAIL:
      return {
        ...state,
        post: null,
      };
    case GET_SEARCH_BLOG_SUCCESS:
      return {
        ...state,      
        filtered_posts: payload.filtered_posts,

   
      };
    case GET_SEARCH_BLOG_FAIL:
      return {
        ...state,
        filtered_posts: null,

  
      };
    default:
      return state;
  }
}

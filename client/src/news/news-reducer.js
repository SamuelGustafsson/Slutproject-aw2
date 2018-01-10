//TODO: Make news store as objets by id insted of array

import {
  NEWS_HAS_ERRORED,
  NEWS_IS_LOADING,
  NEWS_FETCH_DATA_SUCCESS,
  FETCH_SELECTED_NEWS
} from "../action-types";

const initalState = {
  news: [],
  newsHasErrored: false,
  newsIsLoading: false
};

export function newsReducer(state = initalState, action) {
  switch (action.type) {
    case NEWS_FETCH_DATA_SUCCESS:
      return { ...state, news: [...action.news] };

    case NEWS_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case NEWS_HAS_ERRORED:
      return { ...state, newsHasErrored: action.payload };

    case FETCH_SELECTED_NEWS:
      return { ...state, [action.payload.data._id]: action.payload.data };

    case "POST_COMMENT_TO_NEWS":
      return {};

    default:
      return state;
  }
}

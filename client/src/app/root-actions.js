import axios from "axios";

import {
  FETCH_USER,
  NEWS_HAS_ERRORED,
  NEWS_IS_LOADING,
  NEWS_FETCH_DATA_SUCCESS,
  CREATE_NEWS,
  SELECTED_NEWS_ON_PAGE,
  FETCH_SELECTED_NEWS,
  FETCH_USERS
} from "../action-types";

// ***************************** Users Actions *****************************
// export function fetchUsers() {
//     return async dispatch => {
//         const request = await axios.get('/api/users');
//         console.log("Get all users", request);

//         dispatch({
//             type: FETCH_USERS,
//             payload: request
//         });
//     }
// }

export const fetchUser = () => async dispatch => {
  const user = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: user.data });
};

export function fetchUsers() {
  return async dispatch => {
    const request = await axios.get(`/api/users`);
    dispatch({ type: FETCH_USERS, payload: request.data });
  };
}

// ***************************** News Actions *****************************

export function newsHasErrored(bool) {
  return {
    type: NEWS_HAS_ERRORED,
    hasFailed: bool
  };
}

export function newsIsLoading(bool) {
  return {
    type: NEWS_IS_LOADING,
    isLoading: bool
  };
}

export function newsFetchDataSuccess(news) {
  return {
    type: NEWS_FETCH_DATA_SUCCESS,
    news: news
  };
}

export function newsFetchData() {
  return async dispatch => {
    dispatch(newsIsLoading(true));

    const response = await fetch("/api/news");

    if (!response.ok) {
      dispatch(newsHasErrored(true));
      throw Error(response.statusText);
    }

    dispatch(newsIsLoading(false));

    const news = await response.json();
    dispatch(newsFetchDataSuccess(news));
  };
}

//TODO: When user clicks tag set activeNewsItem with that NewsItem?
export function activeNewsTag(tag) {
  return {
    type: "SELECTED_TAG_ON_NEWS_PAGE",
    payload: tag
  };
}

export function activeNewsItem(newsItem) {
  return {
    type: SELECTED_NEWS_ON_PAGE,
    payload: newsItem
  };
}

export function createNews(values) {
  const request = axios.post("/api/news", values);

  return {
    type: CREATE_NEWS,
    payload: request
  };
}

export function fetchSelectedNews(newsItemID) {
  return async dispatch => {
    const request = await axios.get(`/api/news/${newsItemID}`);
    dispatch({ type: FETCH_SELECTED_NEWS, payload: request });
  };
}

export function postCommentToNewsItem(commentObj) {
  return async dispatch => {
    const request = axios.post(
      `/api/news/${commentObj.newsId}/comments`,
      commentObj
    );
    return {
      type: "POST_COMMENT_TO_NEWS",
      payload: request
    };
  };
}

// ************************** OLD ACTIONS ********************

// export function loadMoreNewsSuccess(moreNews) {
//     return {
//         type: LOAD_MORE_NEWS,
//         payload: moreNews
//     }
// }

// export function changePage(currentPage) {
//     return {
//         type: NEXT_NEWS_PAGE,
//         payload: ++currentPage
//     }
// }

// export function fetchMoreNews(currentNewsPage) {
//     const nextPage = currentNewsPage + 1;
//     return async dispatch => {
//         // dispatch(isNewsFilteredByTag(false));
//         dispatch(changePage(currentNewsPage));
//         const response = await fetch(`http://localhost:3000/api/?page=${nextPage}`);
//         const news = await response.json();
//         dispatch(loadMoreNewsSuccess(news));
//     }
// }

import { combineReducers } from "redux";
import { authReducer as auth } from "../auth/auth-reducer";
import { newsReducer as news } from "../news/news-reducer.js";
import { userReducer as users } from "../user/user-reducer.js";
import { reducer as formReducer } from "redux-form";

import { newsPageReducer } from "../news/news.page.reducer";

export default combineReducers({
  auth,
  news,
  users,
  page: combineReducers({
    news: newsPageReducer
  }),
  form: formReducer
});

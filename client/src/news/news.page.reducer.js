import { SELECTED_NEWS_ON_PAGE } from "../action-types";

const initalState = {
  selectedNews: null,
  selectedTag: null
};

export function newsPageReducer(state = initalState, action) {
  switch (action.type) {
    case "SELECTED_TAG_ON_NEWS_PAGE":
      return { ...state, selectedTag: action.payload };
    case SELECTED_NEWS_ON_PAGE:
      return { ...state, selectedNews: action.payload };

    default:
      return state;
  }
}

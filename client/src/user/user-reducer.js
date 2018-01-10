import { FETCH_USERS } from "../action-types";

const initalState = {
  users: []
};

export function userReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [...state, ...action.payload];
  }
  return state;
}

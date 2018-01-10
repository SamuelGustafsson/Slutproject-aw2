import { FETCH_USER } from "../action-types";

// State is null by default till we know that user is logged in
export function authReducer(state = false, action) {
  switch (action.type) {
    // case FETCH_USER:
    //   // if user not logged in return false
    //   return action.payload || false;
    case "LOGIN_USER":
      // if user not logged in return false
      return action.payload || false;

    default:
      return state;
  }
}

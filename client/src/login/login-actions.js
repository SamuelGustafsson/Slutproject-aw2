import axios from "axios";

// ***************************** Auth Actions *****************************

// TODO: Create types for Auth actions

export const loginWithPasswordAndUsername = user => async dispatch => {
  const request = await axios.post(`/api/login/`, user);
  //TODO: När det är false så har inloggningen misslyckats, visa meddelande för användaren.
  dispatch({ type: "LOGIN_USER", payload: request.data });
};

export function loginUser(user) {
  return async dispatch => {
    dispatch(loginWithPasswordAndUsername(user));
  };
}

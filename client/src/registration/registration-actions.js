import axios from "axios";

export function createUser(user) {
    return async dispatch => {
      const request = await axios.post(`/api/register`, user);
      return {
        type: "CREATE_USER",
        payload: request
      };
    };
  }
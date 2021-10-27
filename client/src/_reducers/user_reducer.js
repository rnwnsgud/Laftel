import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_INVENTORY,
} from "../_actions/types";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case ADD_TO_INVENTORY:
      return {
        ...state,
        userData: {
          ...state.userData,
          inventory: action.payload,
        },
      };

    default:
      return state;
  }
}

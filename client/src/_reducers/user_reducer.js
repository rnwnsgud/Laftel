import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_INVENTORY,
  GET_INVENTORY_ITEMS,
  ADD_TO_RECOMMEND,
  GET_RECOMMEND_ITEMS,
  ADD_TO_STARS,
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

    case GET_INVENTORY_ITEMS:
      return { ...state, inventoryDetail: action.payload };

    case ADD_TO_RECOMMEND:
      return {
        ...state,
        userData: {
          ...state.userData,
          recommend: action.payload,
        },
      };

    case ADD_TO_STARS:
      return {
        ...state,
        userData: {
          ...state.userData,
          stars: action.payload,
        },
      };

    case GET_RECOMMEND_ITEMS:
      return { ...state, recommendDetail: action.payload };

    default:
      return state;
  }
}

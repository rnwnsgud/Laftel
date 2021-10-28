import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_INVENTORY,
  GET_INVENTORY_ITEMS,
  ADD_TO_RECOMMEND,
  GET_RECOMMEND_ITEMS,
} from "./types";
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function addToInventory(id) {
  let body = {
    productId: id,
  };

  const request = axios
    .post("/api/users/addToInventory", body)
    .then((response) => response.data);

  return {
    type: ADD_TO_INVENTORY,
    payload: request,
  };
}

export function addToRecommend(id) {
  let body = {
    productId: id,
  };

  const request = axios
    .post("/api/users/addToRecommend", body)
    .then((response) => response.data);

  return {
    type: ADD_TO_RECOMMEND,
    payload: request,
  };
}

export function getInventoryItems(inventoryItems, userInventory) {
  const request = axios
    .get(`/api/product/products_by_id?id=${inventoryItems}&type=array`)
    .then((response) => {
      userInventory.forEach((item) => {
        response.data.product.forEach((productDetail, index) => {
          if (item.id === productDetail._id) {
            response.data.product[index].date = item.date;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_INVENTORY_ITEMS,
    payload: request,
  };
}

export function getRecommendItems(recommendItems, userRecommend) {
  const request = axios
    .get(`/api/product/products_by_id?id=${recommendItems}&type=array`)
    .then((response) => {
      userRecommend.forEach((item) => {
        response.data.product.forEach((productDetail, index) => {
          if (item.id === productDetail._id) {
            response.data.product[index].date = item.date;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_RECOMMEND_ITEMS,
    payload: request,
  };
}

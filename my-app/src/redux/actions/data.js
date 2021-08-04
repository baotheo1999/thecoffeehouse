import {
  GET_LIST_DATA,
  GET_LIST_DATA_FAILED,
  GET_LIST_DATA_SUCCESS,
} from "../constants/data";

export function getListData() {
  return {
    type: GET_LIST_DATA,
  };
}

export function getListDataSuccess(payload) {
  return {
    type: GET_LIST_DATA_SUCCESS,
    payload,
  };
}

export function getListDataFailed(message = "") {
  return {
    type: GET_LIST_DATA_FAILED,
    message,
  };
}

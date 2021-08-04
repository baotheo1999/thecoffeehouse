import {
  GET_LIST_ADDRESS,
  GET_LIST_ADDRESS_FAILED,
  GET_LIST_ADDRESS_SUCCESS,
} from "../constants/address";

export function getListAddress(searchText) {
  return {
    type: GET_LIST_ADDRESS,
    searchText,
  };
}

export function getListAddressSuccess(payload) {
  return {
    type: GET_LIST_ADDRESS_SUCCESS,
    payload,
  };
}

export function getListAddressFailed(message = "") {
  return {
    type: GET_LIST_ADDRESS_FAILED,
    message,
  };
}

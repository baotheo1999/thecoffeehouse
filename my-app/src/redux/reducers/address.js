import produce from "immer";
import {
  GET_LIST_ADDRESS,
  GET_LIST_ADDRESS_FAILED,
  GET_LIST_ADDRESS_SUCCESS,
} from "../constants/address";

export const initialState = {
  listAddress: [],
  statusFlags: {
    isOpen: true,
  },
  log: {
    error: "",
  },
};

/* eslint-disable default-case, no-param-reassign */
const addressReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_LIST_ADDRESS: {
        draft.statusFlags.isOpen = true;
        break;
      }
      case GET_LIST_ADDRESS_SUCCESS: {
        draft.statusFlags.isOpen = false;
        draft.listAddress = action.payload;
        break;
      }
      case GET_LIST_ADDRESS_FAILED: {
        draft.statusFlags.isOpen = false;
        draft.log.error = action.message;
        break;
      }
    }
  });

export default addressReducer;

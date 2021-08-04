import produce from "immer";
import {
  GET_LIST_DATA,
  GET_LIST_DATA_FAILED,
  GET_LIST_DATA_SUCCESS,
} from "../constants/data";

export const initialState = {
  listData: [],
  statusFlags: {
    isLoading: true,
  },
  log: {
    error: "",
  },
};

/* eslint-disable default-case, no-param-reassign */
const dataReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_LIST_DATA: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_LIST_DATA_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.listData = action.payload;
        break;
      }
      case GET_LIST_DATA_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        break;
      }
    }
  });

export default dataReducer;

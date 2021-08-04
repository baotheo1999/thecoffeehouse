import produce from "immer";
import {
  SELECT_PRODUCT,
  CLOSE_MODAL_ORDER,
  ADD_LIST_PRODUCT_ORDER,
} from "../constants/order";

export const initialState = {
  listProductOrder: [],
  indexProductOrder: "",
  infoProductSelect: {},
  statusFlags: {
    openModal: false,
  },
  log: {
    error: "",
  },
};

/* eslint-disable default-case, no-param-reassign */
const orderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case SELECT_PRODUCT: {
        draft.statusFlags.openModal = true;
        draft.infoProductSelect = action.product;
        draft.indexProductOrder = action.index;
        break;
      }

      case CLOSE_MODAL_ORDER: {
        draft.statusFlags.openModal = false;
        draft.infoProductSelect = {};
        break;
      }

      case ADD_LIST_PRODUCT_ORDER: {
        draft.statusFlags.openModal = false;

        if (state.indexProductOrder !== -1) {
          draft.listProductOrder = state.listProductOrder.filter(
            (item, index) => index !== state.indexProductOrder
          );
        }

        let flag = 1;
        const data = action.product;
        draft.listProductOrder.map((item) =>
          item.product_name === data.product_name &&
          item.size === data.size &&
          JSON.stringify(item.codeTopping) ===
            JSON.stringify(data.codeTopping) &&
          item.note === data.note
            ? // eslint-disable-next-line no-sequences
              ((item.amount += data.amount),
              (item.totalPrice += data.totalPrice),
              (flag *= -1))
            : (flag *= 1)
        );

        if (flag === 1) {
          draft.listProductOrder = [...state.listProductOrder, data];
          //set data for localStorage
          // localStorage.setItem("listOrder", JSON.stringify(listOrder));
        } else {
          //set data for localStorage
          // localStorage.setItem(
          //   "listOrder",
          //   JSON.stringify(copyListProductOrder)
          // );
        }

        break;
      }
    }
  });

export default orderReducer;

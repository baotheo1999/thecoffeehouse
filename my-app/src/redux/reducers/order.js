/* eslint-disable no-sequences */
import produce from "immer";
import {
  ADD_LIST_PRODUCT_ORDER,
  CLOSE_MODAL_ORDER,
  SELECT_PRODUCT,
  SET_LIST_PRODUCT_ORDER,
} from "../constants/order";

export const initialState = {
  listProductOrder: [],
  indexProductOrder: -1,
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

        let copyListProductOrder = draft.listProductOrder;
        const data = action.product;
        // edit item product order
        if (state.indexProductOrder !== -1) {
          copyListProductOrder = copyListProductOrder.filter(
            (item, index) => index !== state.indexProductOrder
          );

          draft.listProductOrder = copyListProductOrder;
        }

        let flag = 1;
        copyListProductOrder.map((item) =>
          item.product_name === data.product_name &&
          item.size.val === data.size.val &&
          JSON.stringify(item.codeTopping) ===
            JSON.stringify(data.codeTopping) &&
          item.note === data.note
            ? ((item.amount += data.amount),
              (item.totalPrice += data.totalPrice),
              (flag *= -1))
            : (flag *= 1)
        );

        if (flag === 1) {
          const listOrderProduct = [...copyListProductOrder, data].filter(
            (item) => item.amount > 0
          );
          draft.listProductOrder = listOrderProduct;

          //set data for localStorage
          localStorage.setItem(
            "listOrderProduct",
            JSON.stringify(listOrderProduct)
          );
        } else {
          //set data for localStorage
          localStorage.setItem(
            "listOrderProduct",
            JSON.stringify(copyListProductOrder)
          );
        }

        break;
      }

      case SET_LIST_PRODUCT_ORDER: {
        draft.listProductOrder = action.listProductOrder;
      }
    }
  });

export default orderReducer;

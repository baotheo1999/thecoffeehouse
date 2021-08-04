import {
  SELECT_PRODUCT,
  CLOSE_MODAL_ORDER,
  ADD_LIST_PRODUCT_ORDER,
} from "../constants/order";

export function selectProduct(product) {
  return {
    type: SELECT_PRODUCT,
    product,
  };
}

export function CloseModalOrder() {
  return {
    type: CLOSE_MODAL_ORDER,
  };
}

export function addListProductOrder(product) {
  return {
    type: ADD_LIST_PRODUCT_ORDER,
    product,
  };
}

import { createSelector } from "reselect";
import { initialState } from "../reducers/order";

/**
 * Direct selector to the app state domain
 */

const selectOrderDomain = (state) => state.order || initialState;

const makeSelectProduct = () =>
  createSelector(selectOrderDomain, (substate) => substate.infoProductSelect);

const makeSelectListProductOrder = () =>
  createSelector(selectOrderDomain, (substate) => substate.listProductOrder);

const makeSelectStatusFlags = () =>
  createSelector(selectOrderDomain, (substate) => substate.statusFlags);

export { makeSelectProduct, makeSelectStatusFlags, makeSelectListProductOrder };

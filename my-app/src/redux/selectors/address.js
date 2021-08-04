import { createSelector } from "reselect";
import { initialState } from "../reducers/address";

/**
 * Direct selector to the app state domain
 */

const selectAddressDomain = (state) => state.address || initialState;

const makeSelectListAddress = () =>
  createSelector(selectAddressDomain, (substate) => substate.listAddress);

const makeSelectStatusFlags = () =>
  createSelector(selectAddressDomain, (substate) => substate.statusFlags);

export { makeSelectListAddress, makeSelectStatusFlags };

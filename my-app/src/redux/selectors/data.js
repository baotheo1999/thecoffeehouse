import { createSelector } from "reselect";
import { initialState } from "../reducers/data";

/**
 * Direct selector to the app state domain
 */

const selectDataDomain = (state) => state.data || initialState;

const makeSelectListData = () =>
  createSelector(selectDataDomain, (substate) => substate.listData);

const makeSelectStatusFlags = () =>
  createSelector(selectDataDomain, (substate) => substate.statusFlags);

export { makeSelectListData, makeSelectStatusFlags };

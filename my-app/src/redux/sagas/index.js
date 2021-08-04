import { all } from "redux-saga/effects";
import dataSaga from "./data";
import addressSaga from "./address";
export default function* rootSaga() {
  yield all([dataSaga(), addressSaga()]);
}

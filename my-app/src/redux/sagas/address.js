import _get from "lodash/get";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getListAddressFailed,
  getListAddressSuccess,
} from "../actions/address";
import { GET_LIST_ADDRESS } from "../constants/address";

// function that makes the api request and returns a Promise for response

function fetchAddress(searchText) {
  return fetch(
    `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${searchText.toLowerCase()}&from=TCH-WEB`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "tch-app-version": "",
        "tch-device-id": "",
        "x-csrf-token": "XJVEF4AnLtZqcFJ87XeJaV1nJxGC5HrAkMy9QCHA",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: "https://order.thecoffeehouse.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    }
  ).then((response) => response.json());
}

function* callApiAddress({ searchText }) {
  try {
    const response = yield call(fetchAddress, searchText);
    const data = _get(response, "addresses", []);

    yield put(getListAddressSuccess(data));
  } catch (error) {
    yield put(getListAddressFailed(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* addressSaga() {
  yield takeLatest(GET_LIST_ADDRESS, callApiAddress);
}

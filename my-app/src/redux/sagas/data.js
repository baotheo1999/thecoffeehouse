import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import _get from "lodash/get";
import { getListDataSuccess, getListDataFailed } from "../actions/data";
import { GET_LIST_DATA } from "../constants/data";

// function that makes the api request and returns a Promise for response
function fetchProduct() {
  return axios({
    method: "GET",
    url: "https://api.thecoffeehouse.com/api/v2/menu",
  });
}

function fetchCategory() {
  return axios({
    method: "GET",
    url: "https://api.thecoffeehouse.com/api/v2/category/web",
  });
}

function mergeData(categories, products) {
  categories.map((category) => {
    let arr = [];
    products.map((product) => {
      if (product.categ_id.includes(category.id)) {
        arr.push(product);
      }
      return arr;
    });
    category.ListProduct = arr; // Tạo ra key ListProduct trong category để hứng giá trị của listProduct
    return category;
  });

  return categories.filter((item) => item.ListProduct.length > 0);
}

function* callApiData() {
  try {
    const response = yield call(fetchCategory);
    const category = _get(response, "data", []);
    const response2 = yield call(fetchProduct);
    const product = _get(response2, "data.data", []);

    const data = mergeData(category, product);
    if (response.status === 200 && response2.status === 200) {
      yield put(getListDataSuccess(data));
    } else {
      yield put(getListDataFailed(response));
    }
  } catch (error) {
    yield put(getListDataFailed(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* dataSaga() {
  yield takeLatest(GET_LIST_DATA, callApiData);
}

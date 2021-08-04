import { combineReducers } from "redux";
import dataReducer from "./data";
import addressReducer from "./address";
import orderReducer from "./order";

const rootReducer = combineReducers({
  data: dataReducer,
  address: addressReducer,
  order: orderReducer,
});

export default rootReducer;

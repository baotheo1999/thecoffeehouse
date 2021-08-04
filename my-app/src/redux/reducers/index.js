import { combineReducers } from "redux";
import dataReducer from "./data";
import adddressReducer from "./address";
import orderReducer from "./order";

const rootReducer = combineReducers({
  data: dataReducer,
  address: adddressReducer,
  order: orderReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  global: globalReducer,
  weather: weatherReducer,
});

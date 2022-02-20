import Constants from "../../constants/constants";
import { CHANGE_WEATHER_VIEW, FETCH_TEMPERATURE_FORCAST_DATA, GET_SELECTED_LOCATION, LOADING_WEATHER, SET_HIGHLIGHTED_DAY_ID, SET_WEATHER } from "../actions/types";

const initialState = {
  selectedLocation: null,
  forecast: [],
  highlightedDayId: null,
  chartData: [],
  currentView: Constants.VIEW__SUMMARY,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: action.payload,
      };
    case SET_WEATHER:
      return {
        ...state,
        forecast: action.payload,
      };
    case SET_HIGHLIGHTED_DAY_ID:
      return {
        ...state,
        highlightedDayId: action.payload,
      };
    case CHANGE_WEATHER_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };
    case FETCH_TEMPERATURE_FORCAST_DATA:
      return {
        ...state,
        chartData: action.payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;

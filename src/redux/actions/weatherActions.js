import { getWeatherData } from '../../api/api';
import Util from '../../utils/util';
import { CHANGE_WEATHER_VIEW, FETCH_TEMPERATURE_FORCAST_DATA, GET_SELECTED_LOCATION, SET_HIGHLIGHTED_DAY_ID, SET_WEATHER } from "./types";

// saves selected location
export const getSelectedLocation = location => (dispatch) => {
  dispatch({
    type: GET_SELECTED_LOCATION,
    payload: location,
  });
};

// set highlighted day id to display details of the weather
export const setHighlightedDay = dayId => (dispatch) => {
  dispatch({
    type: SET_HIGHLIGHTED_DAY_ID,
    payload: dayId,
  });
};

// fetch the weather for Selected location
export const getWeather = () => async (dispatch, getState) => {
  const { selectedLocation } = getState().weather;

  const data = await getWeatherData(selectedLocation);

  // prepare an array with weather data for an each day
  const forecast = data?.list.reduce((array, element) => {
    // format the date without time
    const date = new Date(element.dt_txt).toLocaleDateString('en-us', {
      year: 'numeric', month: 'numeric', day: 'numeric',
    });

    // get number of hour based on element date
    const getHours = new Date(element.dt_txt).getHours();

    // check if the date of the element exists in the array
    const getElementDate = array?.length ? array.find(el => el.date === date) : null;
    if (getElementDate) {
      // if so, update an array
      return array.map((el => el.date === date ? Util.getObjectWithForecastStats(date, getHours, el, element) : el));
    }

    // if not, add new item to an array
    return [...array, Util.getObjectWithForecastStats(date, getHours, null, element)];
  }, []);

  dispatch({
    type: SET_WEATHER,
    payload: forecast,
  });

  // saves the data for the chart
  const tempdata = data?.list.map(l => ({
    x: new Date(l.dt * 1000), y: l.main.temp,
  }));

  dispatch(
    {
      type: FETCH_TEMPERATURE_FORCAST_DATA,
      payload: tempdata,
    },
  );

  // select first day for highlight by default
  dispatch(setHighlightedDay(forecast[0].id));
};

// change the view
export const changeWeatherView = view => (dispatch) => {
  dispatch({
    type: CHANGE_WEATHER_VIEW,
    payload: view,
  });
};

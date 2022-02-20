import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Constants from "../constants/constants";

const Util = {
  /**
   * Sets color properties in the body, which allows to use var(--) style based on colors in theme
   * @param {object} theme - object with theme properties
   * @returns {void}
   */
  updateCssColors: (theme) => {
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssKey = `--${key}`;
      const cssValue = value;
      document.body.style.setProperty(cssKey, cssValue);
    });
  },

  /**
   * Returns proper url for the weather icon
   * @param {number} icon - icon number
   * @param {string} size - icon size
   * @returns {string}
   */
  getWeatherIcon: (icon, size) => `https://openweathermap.org/img/wn/${icon}@${size}.png`,

  /**
   * Returns average value of 2 numbers
   * @param {number} prevValue - previous value
   * @param {number} value - next value
   * @returns {void}
   */
  getAverageValue: (prevValue, value) => (prevValue + value) / 2,

  /**
   * Rounds numbers by given step
   * @param {number} valueToRound
   * @param {number} step
   * @returns {void}
   */
  roundByStep: (valueToRound, step) => Math.round(valueToRound / step) * step,

  /**
   * @param {number} prevTemp
   * @param {number} temp
   * @returns {number}
   */
  getDayTimeForecastStats: (prevTemp, temp) => prevTemp ? Util.getAverageValue(prevTemp, temp) : temp,

  /**
   * Returns name of the day part for the given hour
   * @param {number} hour
   * @returns {number}
   */
  assignDayPartBasedOnHours: (hour) => {
    // morning time will be count from 6:00 to 9:00
    if (hour > 5 && hour < 10) { return Constants.DAY__PART__MORNING; }

    // afternoon time will be count from 12:00 to 18:00
    if (hour > 11 && hour < 19) { return Constants.DAY__PART__AFTERNOON; }

    // night time will be count from 21:00 to 03:00
    if (hour > 20 || hour < 4) { return Constants.DAY__PART__NIGHT; }

    return null;
  },

  /**
   * Returns object with assigned or updated new key
   * @param {object} obj
   * @param {string} newKey
   * @returns {object}
   */
  // eslint-disable-next-line object-curly-newline
  assignOrUpdateKeyValuePair: (obj = {}, newKey) => !_.isEmpty(obj) && Object.keys(obj)?.find(key => key === newKey)
  // if object is not empty and contain the given key
    ? Object.fromEntries(Object.entries(obj).map(([key, value]) => {
      // increase number for this key
      if (key === newKey) { return [key, value + 1]; }
      return [key, value];
    }))
  // assign new object
    : Object.assign(obj, {
      [newKey]: 1,
    }),

  /**
   * Returns array of key with the highest value
   * @param {object} object
   * @returns {array}
   */
  // eslint-disable-next-line object-curly-newline
  getKeyWithHighestValue: (object = {}) => {
    const max = Math.max(...Object.values(object));
    return Object.keys(object).filter(key => object[key] === max);
  },

  /**
   * Returns object with properties for weather forcast
   * @param {string} date
   * @param {number} hour
   * @param {object} prevValue
   * @param {object} currentValue
   * @returns {object}
   */
  getObjectWithForecastStats: (date, hour, prevValue, currentValue) => {
    // descructure properties from prevValue
    const { morningTemp, afternoonTemp, nightTemp, humidity, minTemp, maxTemp, meanValue, weatherIcons, modeValue } = prevValue || {
    };

    // descructure properties from currentValue
    const { main: { temp, humidity: averageHumidity, temp_min: averageMinTemp, temp_max: averageMaxTemp } } = currentValue || {
    };

    // get the day part based on the hour
    const dayPart = Util.assignDayPartBasedOnHours(hour);

    const [weather] = currentValue.weather;

    // return object with new or udpated data
    return ({
      id: uuidv4(),
      date,
      morningTemp: dayPart === Constants.DAY__PART__MORNING ? Util.getDayTimeForecastStats(morningTemp, temp) : morningTemp,
      afternoonTemp: dayPart === Constants.DAY__PART__AFTERNOON ? Util.getDayTimeForecastStats(afternoonTemp, temp) : afternoonTemp,
      nightTemp: dayPart === Constants.DAY__PART__NIGHT ? Util.getDayTimeForecastStats(nightTemp, temp) : nightTemp,
      weatherIcons: Util.assignOrUpdateKeyValuePair(weatherIcons, weather?.icon.slice(0, -1)),
      humidity: humidity ? Util.getAverageValue(humidity, averageHumidity) : averageHumidity,
      minTemp: minTemp ? Math.min(minTemp, averageMinTemp) : averageMinTemp,
      maxTemp: maxTemp ? Math.max(maxTemp, averageMaxTemp) : averageMaxTemp,
      meanValue: meanValue ? Util.getAverageValue(meanValue, temp) : temp,
      modeValue: Util.assignOrUpdateKeyValuePair(modeValue, Math.round(temp)),
    });
  },
};

export default Util;

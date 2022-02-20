import axios from "axios";
import _ from 'lodash';

export const getSearchOptions = async (value) => {
  try {
    const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=51f69601b7d08c963e0acbeda039878b`);

    // return unique data for the coutry, for english search language
    const options = _.uniqBy(data.filter(opt => opt?.local_names ? opt?.local_names?.en : opt), 'country');

    return options;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWeatherData = async (location) => {
  const { lat, lon } = {
    ...location,
  };

  try {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=51f69601b7d08c963e0acbeda039878b&units=metric`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

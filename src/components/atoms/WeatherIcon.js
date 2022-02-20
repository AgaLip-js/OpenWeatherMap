import PropTypes from 'prop-types';
import Util from '../../utils/util';

const WeatherIcon = ({ icon, description, size }) => (
  <div>
    <img src={Util.getWeatherIcon(icon, size)} alt={description} title={description} />
  </div>
);

WeatherIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  description: PropTypes.string,
};

export default WeatherIcon;

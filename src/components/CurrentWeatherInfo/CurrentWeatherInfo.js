import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Constants from '../../constants/constants';
import IconsList from '../../utils/IconsList';
import Util from '../../utils/util';
import Unit from '../atoms/Unit';
import WeatherIcon from '../atoms/WeatherIcon';

const StyledWrapper = styled.div``;

const StyledNoDataInformation = styled.div`
  font-size: 1rem;
`;

const StyledMessage = styled.p``;

const StyledWeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledWeatherInfoContainer = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--fg1);
  width: 80%;
  text-align: center;
`;

const StyledLocationHeader = styled.h3`
  text-align: center;
  line-height: 1.5;
`;

const StyledDateContainer = styled.p`
  line-height: 1.5;
`;

const CurrentWeatherInfo = () => {
  const { selectedLocation, forecast } = useSelector(({ weather }) => ({
    selectedLocation: weather.selectedLocation,
    forecast: weather.forecast,
  }));

  // get today date from forecast
  const today = forecast?.find(day => day.date === new Date().toLocaleDateString('en-us', {
    year: 'numeric', month: 'numeric', day: 'numeric',
  })) || null;

  // get weather description
  const weatherDescription = today?.weatherIcons
    ? IconsList.find(icon => icon.iconNumber.toString() === Util.getKeyWithHighestValue(today?.weatherIcons)[0])?.description
    : '';

  // get the current temp based on the first available
  const currentTemp = today.morningTemp || today.afternoonTemp || today.nightTemp;

  return (
    <StyledWrapper>
      {selectedLocation && today
        ? (
          <StyledWeatherCard>
            <StyledLocationHeader>
              {selectedLocation.name}
              <br />
              {' '}
              {selectedLocation.state}
            </StyledLocationHeader>
            <WeatherIcon icon={`${Util.getKeyWithHighestValue(today.weatherIcons)[0]}d`} size='4x' description={weatherDescription} />
            <p>{weatherDescription}</p>
            <Unit number={Util.roundByStep(currentTemp, 0.5)} size="4rem" unit={Constants.UNIT__DEGREE} />
            <StyledWeatherInfoContainer>
              <StyledDateContainer>
                {new Date().toLocaleDateString('en-us', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}
                {' '}
                <br />
                {new Date().toLocaleString('en-us', {
                  hour: 'numeric', minute: 'numeric',
                })}
              </StyledDateContainer>
            </StyledWeatherInfoContainer>
          </StyledWeatherCard>
        )
        : (
          <StyledNoDataInformation>
            <StyledMessage>
              {!selectedLocation ? 'There is no selected location' : 'No results found for this location'}
            </StyledMessage>
          </StyledNoDataInformation>
        )}

    </StyledWrapper>
  );
};

export default CurrentWeatherInfo;

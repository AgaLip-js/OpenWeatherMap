import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CurrentWeatherInfo from '../CurrentWeatherInfo/CurrentWeatherInfo';

const StyledWrapper = styled.div`
  background-color: var(--default);
  width: 30%;
  min-height: 100%;
  padding: 4rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`;
const LeftNav = () => {
  const { selectedLocation, forecast } = useSelector(({ weather }) => ({
    selectedLocation: weather.selectedLocation,
    forecast: weather.forecast,
  }));

  return (
    <StyledWrapper>
      { selectedLocation && forecast?.length && <CurrentWeatherInfo />}
    </StyledWrapper>
  );
};

export default LeftNav;

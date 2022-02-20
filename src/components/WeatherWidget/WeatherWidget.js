import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Unit from '../atoms/Unit';
import WeatherIcon from '../atoms/WeatherIcon';

const StyledWrapper = styled.div`
  background:  var(--default);
  min-width: 15rem;
  min-height: 18rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: ${({ selected }) => selected && '1px solid var(--bg1)'};
  box-shadow: ${({ selected }) => selected && '0 2px 6px rgb(235 110 75)'};
  cursor: ${({ day }) => day && 'pointer'};
`;

const StyledTitle = styled.h3`
  color: ${({ day }) => day ? 'var(--gray300)' : 'var(--bg1)'};
  margin-top: 1rem;
  font-size: ${({ day, theme }) => day ? theme.font.size.headers.xs : theme.font.size.headers.xxs};
  text-align: center;
`;

const UnitContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  flex-direction:${({ day }) => !day && 'column'};
`;

const WeatherWidget = ({ title, dayForecast, units, icon, size, id, onClick }) => {
  const { highlightedDayId } = useSelector(({ weather }) => ({
    highlightedDayId: weather.highlightedDayId,
  }));

  return (
    <StyledWrapper selected={highlightedDayId === id && dayForecast} day={dayForecast} onClick={onClick}>
      <StyledTitle day={dayForecast}>
        {title}
      </StyledTitle>
      {dayForecast && <WeatherIcon icon={`${icon}d`} size={size} />}
      <UnitContainer day={dayForecast}>
        {units.map((u, i) => (
          <div key={uuidv4()}>
            {u.column
              ? (
                <StyledTitle>
                  {u.secondTitle}
                </StyledTitle>
              )
              : null}
            <Unit
              number={Array.isArray(u.number) ? u.number.join(', ') : u.number}
              unit={u.unit}
              color={i > 0 && dayForecast ? 'var(--gray200)' : ''}
              size={Array.isArray(u.number) ? '1.5rem' : ''}
            />
          </div>
        ))}
      </UnitContainer>
    </StyledWrapper>
  );
};

WeatherWidget.propTypes = {
  title: PropTypes.string.isRequired,
  dayForecast: PropTypes.bool,
  units: PropTypes.instanceOf(Array).isRequired,
  icon: PropTypes.string,
  size: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default WeatherWidget;

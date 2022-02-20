import { faChartLine, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from '../components/atoms/Button';
import WeatherWidget from '../components/WeatherWidget/WeatherWidget';
import Constants from '../constants/constants';
import { changeWeatherView, setHighlightedDay } from '../redux/actions/weatherActions';
import Util from '../utils/util';
import ChartView from './ChartView';

const StyledWrapper = styled.div`
  background-color: var(--fg1);
  width: 100%;
  display: flex;
  padding: ${({ theme }) => theme.paddings.m}
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  padding: ${({ theme }) => theme.paddings.l};
`;

const StyledDaysWidgetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
  width: 100%;
  justify-items: center;
  height: 100%;
`;

const StyledHighlightHeader = styled.h3`
  padding: 2rem;
`;

const StyledDayForecastWidgetContainer = styled.div`
`;

const StyledHighlightWidgetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 2rem;
`;

const WeatherView = () => {
  const dispatch = useDispatch();

  const { forecast, highlightedDayId, currentView } = useSelector(({ weather }) => ({
    forecast: weather.forecast,
    highlightedDayId: weather.highlightedDayId,
    currentView: weather.currentView,
  }));

  // get forecast object for highlighted day
  const forcastForSelectedDay = forecast?.find(day => day.id === highlightedDayId);

  // data for day widget
  const getUnitsForDayForecastWidget = day => ([
    {
      number: Util.roundByStep(day.maxTemp, 0.5),
      unit: Constants.UNIT__DEGREE,
    },
    {
      number: Util.roundByStep(day.minTemp, 0.5),
      unit: Constants.UNIT__DEGREE,
    },
  ]);

  // data for widget for selected day highlight
  const dataForSelectedDayHighlights = [
    {
      id: uuidv4(),
      title: 'Morning',
      units: [{
        number: Util.roundByStep(forcastForSelectedDay?.morningTemp, 0.5) || '...',
        unit: Constants.UNIT__DEGREE,
      }],
    },
    {
      id: uuidv4(),
      title: 'Afternoon',
      units: [{
        number: Util.roundByStep(forcastForSelectedDay?.afternoonTemp, 0.5) || '...',
        unit: Constants.UNIT__DEGREE,
      }],
    },
    {
      id: uuidv4(),
      title: 'Night',
      units: [{
        number: Util.roundByStep(forcastForSelectedDay?.nightTemp, 0.5) || '...',
        unit: Constants.UNIT__DEGREE,
      }],
    },
    {
      id: uuidv4(),
      title: 'Max Temperature',
      units: [
        {
          number: Util.roundByStep(forcastForSelectedDay?.maxTemp, 0.5) || '...',
          unit: Constants.UNIT__DEGREE,
        },
        {
          column: true,
          secondTitle: 'Min Temperature',
          number: Util.roundByStep(forcastForSelectedDay?.minTemp, 0.5) || '...',
          unit: Constants.UNIT__DEGREE,
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Humidity',
      units: [{
        number: Math.round(forcastForSelectedDay?.humidity) || '...',
        unit: Constants.UNIT__PERCENT,
      }],
    },
    {
      id: uuidv4(),
      title: 'Mean Value',
      units: [{
        number: Util.roundByStep(forcastForSelectedDay?.meanValue, 0.5) || '...',
        unit: Constants.UNIT__DEGREE,
      },
      {
        column: true,
        secondTitle: 'Mode Value',
        number: forcastForSelectedDay?.modeValue
          ? Util.getKeyWithHighestValue(forcastForSelectedDay?.modeValue) : '...',
        unit: Constants.UNIT__DEGREE,
      }],
    },
  ];

  return (
    <StyledWrapper>
      <StyledButtonsContainer>
        <Button
          type='button'
          secondary={currentView === Constants.VIEW__SUMMARY}
          onClick={() => dispatch(changeWeatherView(Constants.VIEW__SUMMARY))}
        >
          Summary
          <FontAwesomeIcon icon={faList} />
        </Button>
        <Button
          type='button'
          secondary={currentView === Constants.VIEW__CHART}
          onClick={() => dispatch(changeWeatherView(Constants.VIEW__CHART))}
        >
          Chart
          <FontAwesomeIcon icon={faChartLine} />
        </Button>
      </StyledButtonsContainer>
      {
        currentView === Constants.VIEW__SUMMARY
          ? (
            <>
              <StyledDaysWidgetContainer>
                {forecast?.length ? forecast.map(day => (
                  <WeatherWidget
                    title={new Date(day.date).toLocaleDateString('en-us', {
                      weekday: 'long',
                    })}
                    dayForecast
                    units={getUnitsForDayForecastWidget(day)}
                    icon={Util.getKeyWithHighestValue(day.weatherIcons)[0]}
                    size='2x'
                    key={day.id}
                    id={day.id}
                    onClick={() => dispatch(setHighlightedDay(day.id))}
                  />
                ))
                  : <p>No results was found</p>}
              </StyledDaysWidgetContainer>
              <StyledDayForecastWidgetContainer>
                <StyledHighlightHeader>
                  {forcastForSelectedDay
                    ? new Date(forcastForSelectedDay.date).toLocaleDateString('en-us', {
                      weekday: 'long',
                    }) : ''}
                  {' '}
                  Highlights
                </StyledHighlightHeader>
                <StyledHighlightWidgetContainer>

                  {dataForSelectedDayHighlights.map(val => (
                    <WeatherWidget
                      title={val.title}
                      units={val.units}
                      key={val.id}
                    />
                  ))}
                </StyledHighlightWidgetContainer>
              </StyledDayForecastWidgetContainer>
            </>
          )
          : <ChartView />
      }
    </StyledWrapper>
  );
};

export default WeatherView;

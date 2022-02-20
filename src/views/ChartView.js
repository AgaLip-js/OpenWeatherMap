import { useEffect, useState } from 'react';
import ReactApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.main`
  height: 100%;
  width: 100%;
  min-height: 300px;
`;

const ChartView = () => {
  const [series, setSeries] = useState([]);
  const { chartData } = useSelector(({ weather }) => ({
    chartData: weather.chartData,
  }));

  const options = {
    chart: {
      height: "100%",
      width: "100%",
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Temperature Forecast 5 days',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Temperature [° C]',
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",

      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
  };

  useEffect(() => {
    setSeries([{
      name: "Temperature",
      data: chartData,
    }]);
  }, [chartData]);

  if (!series || !options) {
    return <p>...Loading</p>;
  }

  return (
    <StyledWrapper>
      <ReactApexCharts options={options} series={series} height="100%" type='area' />
    </StyledWrapper>
  );
};

export default ChartView;

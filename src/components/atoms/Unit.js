import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledUnit = styled.h2`
  font-size: ${({ size }) => size || '2rem'};
  color: ${({ color }) => color || 'var(--gray300)'};
  text-align: center;
  margin: ${({ theme }) => theme.paddings.xs};
`;

const Unit = ({ number, size, color, unit }) => (
  <StyledUnit size={size} color={color}>
    {number}
    {unit}
  </StyledUnit>
);

Unit.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  unit: PropTypes.string.isRequired,
};

export default Unit;

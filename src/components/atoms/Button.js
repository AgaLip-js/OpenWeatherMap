import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  border: 0;
  width: ${({ width }) => width || '100px'};
  height: ${({ height }) => height || '40px'};
  min-height:  ${({ height }) => height || '40px'};
  background:  ${({ secondary }) => secondary ? 'var(--bg1)' : 'var(--bg2)'};
  color: var(--default);
  margin:  ${({ margin }) => margin || '0 1rem'};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: var(--bg1);
  }

  :focus {
    outline:none;
  }
`;

const Button = ({ children, type, onClick, disabled, secondary, width, margin, height }) => (
  <>
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      secondary={secondary}
      width={width}
      margin={margin}
      height={height}
      data-test="button"
    >
      {children}
    </StyledButton>
  </>
);

Button.propTypes = {
  /*
   * button type
   */
  type: PropTypes.string.isRequired,
  /*
   * everything that is used to display
   * it depends of what is include between the opening and closing tags when invoking a component
   */
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]).isRequired,
  /*
   * onClick function to trigger an action
   */
  onClick: PropTypes.func.isRequired,
  /*
   * component status - disabled or not
   */
  disabled: PropTypes.bool,
  /*
   * props passed in a styledButton to style it
   */
  secondary: PropTypes.bool,
  /*
   * component width property
   */
  width: PropTypes.string,
  /*
   * component height property
   */
  height: PropTypes.string,
  /*
   * component margin property
   */
  margin: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  secondary: false,
  width: '100px',
  margin: '0 1rem',
  height: '40px',
};

export default Button;

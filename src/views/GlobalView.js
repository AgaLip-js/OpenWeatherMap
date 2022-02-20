import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/GlobalStyle';
import Util from '../utils/util';

const GlobalView = ({ children }) => {
  const { theme, themeMode } = useSelector(
    ({ global }) => ({
      theme: global.theme,
      themeMode: global.themeMode,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (theme && themeMode) {
      localStorage.setItem("theme", themeMode);
      Util.updateCssColors(theme);
    }
  }, [theme, themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

GlobalView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]).isRequired,
};

export default GlobalView;

export const breakpoints = {
  huge: 1700,
  bigDesktop: 1440,
  desktop: 1150,
  bigTablet: 1020,
  tablet: 765,
  phone: 370,
};

const theme = {
  mq: Object.keys(breakpoints).reduce((acc, breakpoint) => {
    acc[breakpoint] = `@media (min-width: ${breakpoints[breakpoint]}px)`;
    return acc;
  }, {
  }),
  mm: {
    phone: `@media (max-width: ${breakpoints.tablet}px)`,
    tablet: `@media (min-width: ${breakpoints.tablet + 1}px) and (max-width: ${breakpoints.desktop}px)`,
    desktop: `@media (min-width: ${breakpoints.desktop + 1}px)`,
  },
  borders: {
    radius: {
      s: "0.3rem",
    },
  },
  paddings: {
    xxs: "0 0.5rem",
    xs: "0.5rem",
    s: "1rem 1.5rem",
    m: "1.5rem 2rem",
    l: "2rem 2.5rem",
    xl: "2.5rem 3.5rem",
    xxl: "3rem 4rem",
  },
  font: {
    size: {
      headers: {
        xxs: "1.5rem",
        xs: "1.8rem",
        s: "2.2rem",
        m: "2.5rem",
        l: "3rem",
        xl: "4rem",
        xxl: "5rem",
      },
      body: {
        xxs: "1.0rem",
        xs: "1.35rem",
        s: "1.40rem",
        m: "1.5rem",
        l: "1.7rem",
        xl: "1.9rem",
        xxl: "2.1rem",
      },
    },
  },
  transition: {
    default: "color .3s ease-in-out, background-color .3s ease-in-out",
    defaultAll: "all .3s ease-in-out",
  },
};

export const lightTheme = {
  ...theme,
  colors: {
    default: "#ffffff",
    bg1: "#eb6e4b",
    bg2: "#48484a",
    bg2h: "#48484a",
    fg1: "#ebecf0",
    scroll_thumb: 'lightgray',
    gray300: '#111',
    gray200: '#a0a0a0',

  },
  gradient: {
    background: 'linear-gradient(to right,#eb6e4b,#48484a)',
  },
  shadows: {
    default: "1px 2px 3px 1px #a2a2a2",
    configuration_bar: "-5px 0px 0px 0px #a2a2a2",
    header: "1px 2px 4px 1px #b6b6b6",
    filter_menu: `1px 1px 6px 1px #d4d4d4`,
    table: "4px 0 0 -2px #a2a2a2, -4px 0 0 -2px #a2a2a2",
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    default: "blue",
    bg1: "#fff3e6",
    fg1: "#101010",
  },
  shadows: {
    default: "1px 2px 3px 1px #a2a2a2",
    configuration_bar: "-5px 0px 0px 0px #a2a2a2",
    header: "1px 2px 4px 1px #b6b6b6",
    filter_menu: `1px 1px 6px 1px #d4d4d4`,
    table: "4px 0 0 -2px #a2a2a2, -4px 0 0 -2px #a2a2a2",
  },
};

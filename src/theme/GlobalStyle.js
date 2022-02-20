import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    @media(min-width: 1440px) {
      font-size: 62.5%; // 10px
    }
    @media(min-width: 1020px) and (max-width: 1440px) {
      font-size: 56.25%; // 9px
    }
    @media(min-width: 765px) and (max-width: 1020px) {
      font-size: 50%; // 8px
    }
    @media(max-width: 765px) {
      font-size: 43.75%; // 7px
    }
  }

  *::-webkit-scrollbar-thumb {
    background: var(--scroll_thumb);
    background-clip: padding-box;
    border: .2rem solid transparent;
   }

  *::-webkit-scrollbar {
    height: 1.1rem;
    overflow: visible;
    width: 1.1rem;
  }

  @font-face {
    font-family:'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    scroll-behavior: smooth;
    font-size: 1.6rem;
    color: var(--gray300);
    font-family:'Roboto', sans-serif;
  }

  #root {
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }

  html, body {
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
  }

`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
export const GlobalStyle = createGlobalStyle`
* {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: auto;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  html {
    display: flex;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    background-color: ${theme.colors.background};
    color: ${theme.colors.textPrimary};
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: auto;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: 'Poppins', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  body {
    box-sizing: border-box;
    width: 100vw;
    overscroll-behavior-y: none;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }

  body button {
    font-family: inherit;
  }

  #root {
    height: 100%;
    width: 100%;
    display: flex;
  }

  /* Chrome, Edge, and Safari scrollbar */
    *::-webkit-scrollbar{
    width: 12px;               /* width of the entire scrollbar */
  }

  *::-webkit-scrollbar-track{
    background: ${theme.colors.darkTwo};        /* color of the tracking area */
  }

  *::-webkit-scrollbar-thumb{
    background-color: ${theme.colors.darkThree};    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
    border: 3px solid ${theme.colors.darkTwo};  /* creates padding around scroll thumb */
  }
  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.darkThree} ${theme.colors.darkTwo};
  }

`;

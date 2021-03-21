import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    background: '#161717',
    darkOne: '#161717',
    darkTwo: '#202020',
    darkThree: '#2B2B2B',
    // primary: '#00acff',
    // primary: '#0D34FF',
    primary: '#1e88e5',
    primaryDark: '#007dcb',
    primaryDarkest: '#0d34ff',
    paper: '#202020',
    textPrimary: '#fff',
    textGrey: '#a6b0cf',
    textGreyMuted: '#9699a8',
    textSecondary: '#717579',
    textError: 'rgb(224, 36, 94)',
    tooltip: '#3E4954',
  },

  effects: {
    buttonHover: 'rgba(29, 161, 242, 0.1)',
    dangerHover: 'rgba(224, 36, 94, 0.2)',
  },
  elevation: {
    one:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    two:
      '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
    three:
      '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  },
  device: {
    mobile: '(max-width: 500px)',
    mobileLarge: '(min-width: 501px) and (max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    tabletAndDown: '(max-width: 768px)',
    tabletAndUp: '(min-width: 768px)',
    medium: '(min-width: 501px) and (max-width: 1023px)',
    laptop: '(min-width: 1024px) and (max-width: 1600px)',
    laptopAndUp: '(min-width: 1024px)',
    desktop: '(min-width: 1601px)',
  },
};

export { theme };

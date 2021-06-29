import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    background: '#0b0e11',
    darkOne: '#0b0e11',
    // darkTwo: '#151a21',
    darkTwo: '#131619',
    // darkTwo: '#1c1c25',
    darkThree: '#242c37',
    darkFour: '#323d4d',
    cardLight: '#21222d', //TODO: Remove
    cardDark: '#1c1c25', //TODO: Remove
    primary: '#1e88e5',
    primaryDark: '#007dcb',
    primaryDarkest: '#0d34ff', //TODO: Remove
    paper: '#202020',
    textPrimary: '#fff',
    textPrimaryInversed: '#000000',
    textGrey: '#8c91a1',
    textGreyMuted: '#9699a8', //TODO: Remove
    textSecondary: '#8c91a1', // Same as text grey
    // textSecondary: '#5d7292',
    textError: 'rgb(224, 36, 94)',
    tooltip: '#3E4954',
    red: 'rgb(236,69,97)',
    yellow: 'rgb(241,180,76)',
    green: 'rgb(27, 170, 118, 1)',
    turqouise: 'rgb(2,164,153)',
    border: '#242c37',
    list: '#161b22',
  },
  charts: {
    greenFill: '#34c38f',
    greenStroke: '#1BAA76',
    purpleFill: '#8884d8',
    purpleStroke: '#5551A5',
    blueFill: '#2451B7',
    blueStroke: '#2451B7',
    strokeWidth: 4,
  },
  elements: {
    pills: {
      primary: {
        text: 'rgb(166,213,250)',
        background: 'rgba(30, 136, 229, 0.15)',
      },
      warning: {
        text: 'rgb(255, 213, 153)',
        background: 'rgba(133, 104, 0, 0.15)',
      },
      danger: {
        text: 'rgba(218, 78, 122, 0.91)',
        background: 'rgba(148, 16, 38, .15)',
      },
    },
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

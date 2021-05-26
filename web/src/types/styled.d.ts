/* eslint-disable prettier/prettier */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      darkOne: string;
      darkTwo: string;
      darkThree: string;
      darkFour: string;
      primary: string;
      primaryDark: string;
      primaryDarkest: string;
      paper: string;
      red: string;
      yellow: string;
      green: string;
      turqouise: string;
      textPrimary: string;
      textPrimaryInversed: string;
      textGrey: string;
      textGreyMuted: string;
      textSecondary: string;
      textError: string;
      tooltip: string;
      cardLight: string;
      cardDark: string;
    };
    charts: {
      greenFill: string;
      greenStroke: string;
      purpleFill: string;
      purpleStroke: string;
      blueFill: string;
      blueStroke: string;
      strokeWidth: number;
    };
    effects: {
      buttonHover: string;
      dangerHover: string;
    };
    elevation: {
      one: string;
      two: string;
      three: string;
    };
    device: {
      mobile: string;
      mobileLarge: string;
      tablet: string;
      tabletAndDown: string;
      tabletAndUp: string;
      medium: string;
      laptop: string;
      laptopAndUp: string;
      desktop: string;
    };
  }
}

/* eslint-disable prettier/prettier */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      darkOne: string;
      darkTwo: string;
      darkThree: string;
      primary: string;
      primaryDark: string;
      primaryDarkest: string;
      paper: string;
      textPrimary: string;
      textPrimaryInversed: string;
      textGrey: string;
      textGreyMuted: string;
      textSecondary: string;
      textError: string;
      tooltip: string;
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

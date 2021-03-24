import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../constants/theme';

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default AppThemeProvider;

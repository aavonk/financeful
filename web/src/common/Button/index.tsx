import * as React from 'react';
import { StyledButton, ButtonText } from './style';

type ButtonProps = {
  outline?: boolean;
  fullWidth?: boolean;
  children: string;
  type?: 'submit' | undefined;
  margin?: string;
};

const Button = ({ children, outline, fullWidth, margin }: ButtonProps) => {
  return (
    <StyledButton outline={outline} fullWidth={fullWidth} margin={margin}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

import * as React from 'react';
import { StyledButton, ButtonText } from './style';

type ButtonProps = {
  outline?: boolean;
  fullWidth?: boolean;
  children: string;
  type?: 'submit' | undefined;
  margin?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  outline,
  fullWidth,
  margin,
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      outline={outline}
      fullWidth={fullWidth}
      margin={margin}
      disabled={disabled}
    >
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

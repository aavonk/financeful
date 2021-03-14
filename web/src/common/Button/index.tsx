import * as React from 'react';
import { StyledButton, ButtonText } from './style';

type ButtonProps = {
  outline?: boolean;
  fullWidth?: boolean;
  children: string;
  type?: 'submit' | undefined;
  margin?: string;
  disabled?: boolean;
  variant: 'primary' | 'outline' | 'dark';
};

const Button = ({
  children,
  outline,
  fullWidth,
  margin,
  disabled,
  variant,
}: ButtonProps) => {
  return (
    <StyledButton
      outline={outline}
      fullWidth={fullWidth}
      margin={margin}
      disabled={disabled}
      variant={variant}
    >
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

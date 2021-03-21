import * as React from 'react';
import { StyledButton, ButtonText } from './style';

type ButtonProps = {
  fullWidth?: boolean;
  children: string;
  type?: 'submit' | undefined;
  margin?: string;
  disabled?: boolean;
  variant: 'primary' | 'outline' | 'dark';
  id?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  fullWidth,
  margin,
  disabled,
  variant,
  onClick,
  id,
}: ButtonProps) => {
  return (
    <StyledButton
      fullWidth={fullWidth}
      margin={margin}
      disabled={disabled}
      variant={variant}
      id={id}
      onClick={onClick}
    >
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
};

export default Button;

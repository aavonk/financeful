/* eslint-disable react/display-name */
import * as React from 'react';
import { StyledButton, ButtonText } from './style';

export type ButtonVariants =
  | 'primary'
  | 'outline'
  | 'dark'
  | 'danger'
  | 'danger-secondary'
  | 'cubed';

type ButtonProps = {
  fullWidth?: boolean;
  children: string;
  type?: 'submit' | undefined;
  margin?: string;
  disabled?: boolean;
  variant: ButtonVariants;
  id?: string;
  onClick?: (e?: any) => void;
  className?: string;
  'data-testid'?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <StyledButton
      fullWidth={props.fullWidth}
      margin={props.margin}
      disabled={props.disabled}
      variant={props.variant}
      id={props.id}
      onClick={props.onClick}
      ref={ref}
      data-testid={props['data-testid']}
      className={props.className}
    >
      <ButtonText>{props.children}</ButtonText>
    </StyledButton>
  );
});

export default Button;

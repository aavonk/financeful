import * as React from 'react';
import { StyledButton } from './style';

type Props = {
  small?: boolean;
  danger?: boolean;
  active?: boolean;
  grey?: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function IconButton({ small, danger, active, grey, ...props }: Props) {
  return (
    <StyledButton
      $small={small}
      $danger={danger}
      $grey={grey}
      $active={active}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
}

export default IconButton;

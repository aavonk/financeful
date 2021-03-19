import * as React from 'react';
import { StyledButton } from './style';

type Props = {
  small?: boolean;
  active?: boolean;
  grey?: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaText: string;
};

function IconButton({ small, active, grey, ariaText, ...props }: Props) {
  return (
    <>
      <StyledButton
        $small={small}
        $grey={grey}
        $active={active}
        {...props}
        aria-label={ariaText}
      >
        {props.children}
      </StyledButton>
    </>
  );
}

export default IconButton;

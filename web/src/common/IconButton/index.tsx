import * as React from 'react';
import { StyledButton } from './style';
import VisuallyHidden from '@reach/visually-hidden';
type Props = {
  small?: boolean;
  active?: boolean;
  grey?: boolean;
  blue?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaText: string;
  'data-testid'?: string;
};

function IconButton({ small, active, grey, blue, ariaText, disabled, ...props }: Props) {
  return (
    <>
      <StyledButton
        $small={small}
        $grey={grey}
        $active={active}
        $blue={blue}
        {...props}
        disabled={disabled}
        data-testid={props['data-testid']}
      >
        <VisuallyHidden>{ariaText}</VisuallyHidden>
        {props.children}
      </StyledButton>
    </>
  );
}

export default IconButton;

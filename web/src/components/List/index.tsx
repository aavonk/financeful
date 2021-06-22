import React from 'react';
import Button from '@Common/Button';
import type { ButtonVariants } from '@Common/Button';
import { CheckBox } from '@Common/FormElements';
import type { CheckboxProps } from '@Common/FormElements';
import styled from 'styled-components';
import Skeleton from '@Common/Skeleton';
import { motion, usePresence, AnimatePresence } from 'framer-motion';

const StyledList = styled.ul`
  background-color: ${({ theme }) => theme.colors.list};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  width: 100%;
  list-style: none;
  font-size: 0.875rem;

  & > li:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

interface ListProps {
  children: React.ReactNode;
}

export function List({ children }: ListProps) {
  return (
    <AnimatePresence>
      <StyledList>{children}</StyledList>;
    </AnimatePresence>
  );
}

const StyledAnimatedItem = styled(motion.li)`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;

  & > div > small {
    color: ${({ theme }) => theme.colors.textGrey};
  }
`;
const ItemLeft = styled.div`
  flex: 1 0 75%;
`;

const ItemRight = styled.div`
  flex: 1 0 25%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  height: 100%;
`;

type ItemProps = {
  heading: string;
  subheading?: string;
  asLoader?: boolean;
};

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: ButtonVariants;
};

type ModifiedCheckboxProps = Omit<CheckboxProps, 'checked'>;

type OptionalProps =
  | {
      withButton?: false;
      buttonProps?: never;
      withCheckbox?: never;
      checkboxProps?: never;
    }
  | {
      withButton: true;
      buttonProps: ButtonProps;
      withCheckbox?: never;
      checkboxProps?: never;
    }
  | {
      withCheckbox: true;
      checkboxProps: ModifiedCheckboxProps;
      withButton?: never;
      buttonProps?: never;
    };

type ListItemProps = ItemProps & OptionalProps;

const transition = { type: 'spring', stiffness: 500, damping: 50, mass: 1 };

export function ListItem({
  heading,
  subheading,
  withButton,
  buttonProps,
  asLoader,
  withCheckbox,
  checkboxProps,
}: ListItemProps) {
  const [checked, setChecked] = React.useState(false);
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: 'out',
    animate: isPresent ? 'in' : 'out',
    variants: {
      in: { scaleY: 1, opacity: 1 },
      out: { scaleY: 0, opacity: 0, zIndex: -1 },
    },
    onAnimationComplete: () => !isPresent && safeToRemove!(),
    transition,
  };

  return (
    <StyledAnimatedItem {...animations}>
      <ItemLeft>
        {asLoader ? (
          <Skeleton width="80%" height="24px" />
        ) : (
          <>
            <p>{heading}</p>
            <small>{subheading}</small>
          </>
        )}
      </ItemLeft>
      {withButton && (
        <ItemRight>
          <Button variant={buttonProps!.variant || 'dark'} {...buttonProps}>
            {buttonProps!.text}
          </Button>
        </ItemRight>
      )}
      {!withButton && withCheckbox && (
        <CheckBox
          {...checkboxProps!}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            checkboxProps!.onChange(e);
          }}
        />
      )}
    </StyledAnimatedItem>
  );
}

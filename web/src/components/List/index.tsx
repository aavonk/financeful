import Button from '@Common/Button';
import React from 'react';
import styled from 'styled-components';

type StyleProps = {
  maxWidth?: string;
};
const StyledList = styled.ul<StyleProps>`
  background-color: ${({ theme }) => theme.colors.list};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  width: ${({ maxWidth }) => (maxWidth ? maxWidth : '100%')};
  list-style: none;
  font-size: 0.875rem;

  & > li:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

interface ListProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export function List({ children, maxWidth }: ListProps) {
  return <StyledList maxWidth={maxWidth}>{children}</StyledList>;
}

const StyledItem = styled.li`
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
};

type ButtonProps = {
  text: string;
  onClick: () => void;
};

type OptionalProps =
  | { withButton?: false; buttonProps?: never }
  | { withButton: true; buttonProps: ButtonProps };

type ListItemProps = ItemProps & OptionalProps;

export function ListItem({
  heading,
  subheading,
  withButton,
  buttonProps,
}: ListItemProps) {
  return (
    <StyledItem>
      <ItemLeft>
        <p>{heading}</p>
        <small>{subheading}</small>
      </ItemLeft>
      {withButton && buttonProps && (
        <ItemRight>
          <Button variant="dark" onClick={buttonProps.onClick}>
            {buttonProps.text}
          </Button>
        </ItemRight>
      )}
    </StyledItem>
  );
}

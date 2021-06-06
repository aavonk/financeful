import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const BlueLink = styled(Link)<LinkProps>`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  & :hover {
    color: rgb(21, 95, 160);
  }
`;

export const BlueText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  & :hover {
    color: rgb(21, 95, 160);
  }
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

type ColProps = {
  width: string;
  paddingLeftOnly?: boolean;
  paddingRightOnly?: boolean;
};
export const Col = styled.div<ColProps>`
  flex: 0 0 auto;
  width: ${(props) => props.width};
  padding-right: calc(1rem / 2);
  padding-left: calc(1rem / 2);
  margin-top: 0.5rem;

  ${({ paddingLeftOnly }) =>
    paddingLeftOnly &&
    css`
      padding-left: calc(1rem / 2);
      padding-right: 0;
    `}

  ${({ paddingRightOnly }) =>
    paddingRightOnly &&
    css`
      padding-right: calc(1rem / 2);
      padding-left: 0;
    `}
`;

export const FormRow = styled(Row)`
  padding: 8px 0;
`;

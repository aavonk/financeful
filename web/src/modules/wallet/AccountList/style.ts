import styled, { css } from 'styled-components';
import { Props as PaperProps, StyledPaper as Paper } from '@Common/Paper';

export const StyledPaper = styled(Paper)<PaperProps>`
  /* background-color: red; */
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex: 0 0 auto;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.darkTwo};
  position: sticky;
  top: 0;
`;

export const TextWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  & > h3 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 1.2rem;
    font-weight: 600;
  }

  & > p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
  }
`;

export const Container = styled.div`
  padding: 0.825rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 600px;
  min-height: 400px;
`;

export const AccountItemBox = styled.div<{ $inactive?: boolean }>`
  display: flex;
  flex-direction: row;
  flex: 0 0 100%;
  padding: 0.5rem 0 0.5rem 0.2rem;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
    /* padding: 0.5rem;
    transition: padding 0.2s ease-in; */
  }
  ${({ $inactive }) =>
    $inactive &&
    css`
      color: ${({ theme }) => theme.colors.textSecondary};
    `}
`;

export const ItemName = styled.div`
  flex-basis: 24.5%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-right: 4px;

  & > :first-child {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > :last-child {
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

import styled, { css } from 'styled-components';
import { FlexRow } from '@Globals/index';

export const ToolbarRoot = styled(FlexRow)`
  align-items: flex-end;
`;

export const TabContainer = styled(FlexRow)`
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkThree};
`;

export const TabItem = styled.div`
  padding: 0 0.875rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      ${Indicator} {
        background-color: ${({ theme }) => theme.colors.primary};
        transition: color 0.2s ease-in;
      }
      ${TabLabel} {
        color: ${({ theme }) => theme.colors.primary};
        transition: color 0.2s ease-in;
      }
    `}
`;

export const Indicator = styled.div`
  height: 3px;
  margin-top: 12px;
  border-radius: 9px;
  width: 50%;
`;

export const TabLabel = styled.span`
  font-size: 1rem;
  line-height: 27px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 340px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 9px;
  padding: 0 0.25rem;
  & > svg {
    margin-right: 12px;
    height: 1.25rem;
    width: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.darkTwo};
  font-weight: 500;
  width: 100%;
  font-size: 18px;
  border-radius: 4px;
  padding: 8px 12px;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
`;

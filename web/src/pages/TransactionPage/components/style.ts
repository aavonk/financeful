import styled, { css } from 'styled-components';
import { FlexRow } from '@Globals/index';

export const ActionsContainer = styled(FlexRow)`
  flex: 1 0 auto;
  justify-content: flex-end;
`;

export const SearchContainer = styled.div`
  position: relative;
  /* min-width: 340px;
  max-width: 380px; */
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 9px;
  padding: 0 0.25rem;
  margin-right: 1.25rem;
  margin-left: 1.25rem;
  & > svg {
    margin-right: 0.75rem;
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

export const TabContainer = styled(FlexRow)`
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkThree};
  overflow-x: auto;
  ::-webkit-scrollbar {
    width: 14px;
    height: 16px;
  }

  ::-webkit-scrollbar-thumb {
    height: 4px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-border-radius: 16px;
    -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
      inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }

  ::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const TabItem = styled.div`
  padding: 0 0.675rem;
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
        color: ${({ theme }) => theme.colors.textPrimary};
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
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
  }
`;

export const ToolbarRoot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  //1005px
  @media (max-width: 1195px) {
    flex-direction: column;
    align-items: stretch;

    ${ActionsContainer} {
      justify-content: space-between;
      margin-top: 1rem;
    }
    ${SearchContainer} {
      margin-left: 0;
    }

    ${TabLabel} {
      font-size: 0.9rem;
    }
  }
`;

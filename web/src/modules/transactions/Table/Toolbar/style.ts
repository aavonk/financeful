import styled, { css } from 'styled-components';
import { FlexRow } from '@Globals/index';

export const ToolbarTop = styled(FlexRow)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  justify-content: space-between;
`;
export const ToolbarBottom = styled(FlexRow)`
  width: 100%;
  margin-top: 10px;
  justify-content: space-between;
  /* @media (max-width: 800px) {
    justify-content: space-between;
  } */
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  & > :first-child() {
    margin-right: 10px;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  align-items: center;
  /* flex-basis: 40%; */
  display: flex;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  border-radius: 9px;
  padding: 0 0.25rem;
  margin-right: 1.25rem;
  height: 34px;
  width: 100%;
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
  font-size: 18px;
  border-radius: 4px;
  padding: 8px 12px;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 100%;
  height: 34px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const TabContainer = styled(FlexRow)`
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.darkThree};
  overflow-x: auto;
  @media (max-width: 800px) {
    display: none;
  }
`;

export const TabLabel = styled.span`
  font-size: 1rem;
  line-height: 27px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textSecondary};
  & :focus-visible {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
  }
`;
export const Indicator = styled.div`
  height: 3px;
  margin-top: 12px;
  border-radius: 9px;
  width: 50%;
`;

export const TabItem = styled.button`
  padding: 0 0.675rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  font-family: 'Poppins', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }
  & :focus :focus-visible, :focus-within {
     & > span {
       color: ${({ theme }) => theme.colors.textPrimary};
     }
  }
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

export const ToolbarRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media ${({ theme }) => theme.device.desktop} {
    max-width: 1440px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  //1005px
  @media (max-width: 1195px) {
    flex-direction: column;
    align-items: stretch;

    ${SearchContainer} {
      margin-left: 0;
      position: relative;
      align-items: center;
      display: flex;
    }

    ${TabLabel} {
      font-size: 0.9rem;
    }
  }
`;

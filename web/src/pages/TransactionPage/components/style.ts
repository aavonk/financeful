import styled, { css } from 'styled-components';
import { FlexRow } from '@Globals/index';

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

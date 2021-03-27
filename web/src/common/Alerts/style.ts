import styled, { css } from 'styled-components';
import { IAlert } from '@Context/alert/alertContext';

export const AlertRoot = styled.div<{ type: IAlert['type'] }>`
  position: fixed;
  left: 50%;
  right: auto;
  bottom: 24px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212121;
  z-index: 2500;
  color: #fff;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.43;
  padding: 6px 16px;
  border-radius: 4px;
  letter-spacing: 0.01071em;
  box-shadow: ${({ theme }) => theme.elevation.two};
  ${(props) =>
    props.type === 'error' &&
    css`
      background-color: #f44336 !important;
    `}
  ${(props) =>
    props.type === 'info' &&
    css`
      background-color: #2195f3 !important;
    `}
      ${(props) =>
    props.type === 'success' &&
    css`
      background-color: #4caf50 !important;
    `}
`;

export const AlertIcon = styled.div`
  display: flex;
  opacity: 0.9;
  padding: 7px 0;
  font-size: 22px;
  margin-right: 12px;
`;

export const AlertMessage = styled.div`
  padding: 8px 0;
`;

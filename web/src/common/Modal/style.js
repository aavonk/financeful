import styled, { css } from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1500;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: calc(100% - 64px);
  transform: translate(-50%, -50%);
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  z-index: 1600;
  background-color: ${({ theme }) => theme.colors.paper};
  border-radius: 4px;
  ${(props) =>
    props.$small &&
    css`
      max-width: 350px !important;
    `}
`;

export const ModalTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
  padding: 4px 16px;
  color: ${({ theme }) => theme.colors.textGrey};
  border-bottom: ${({ theme }) => '1px solid ' + theme.colors.textGrey};
  & > h6 {
    font-size: 20px;
    font-weight: 500;
  }
`;
export const ModalContent = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 16px;
`;
export const ModalActions = styled.div`
  flex: 0 0 auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: row-reverse;
  border-top: ${({ theme }) => '1px solid ' + theme.colors.textGrey};
`;

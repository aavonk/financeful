import styled, { css } from 'styled-components';

type ButtonProps = {
  fullWidth?: boolean;
  margin?: string;
};

export const Container = styled.div`
  position: relative;
`;
export const StyledButton = styled.button<ButtonProps>`
  font-size: 1rem;
  min-width: 64px;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 9px;
  letter-spacing: 0.02857em;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  outline: 0;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.colors.darkTwo};
  transition: background-color 0.2s ease-in-out;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: ${(props) => (props.margin ? props.margin : '0')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkThree};
  }
  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }

  &::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100% !important;
    `}
`;

export const ButtonText = styled.span`
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

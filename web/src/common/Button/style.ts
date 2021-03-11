import styled, { css } from 'styled-components';

type ButtonProps = {
  outline?: boolean;
  fullWidth?: boolean;
  margin?: string;
};
export const StyledButton = styled.button<ButtonProps>`
  font-size: 1rem;
  min-width: 64px;
  font-weight: 700;
  line-height: 1.75;
  border-radius: 12px;
  letter-spacing: 0.02857em;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  outline: 0;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  transition: background-color 0.2s ease-in-out;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: ${(props) => (props.margin ? props.margin : '0')};
  background-color: ${(props) =>
    props.outline ? 'transparent' : props.theme.colors.primary};
  border: ${(props) =>
    props.outline ? '1px solid ' + props.theme.colors.primary : 'transparent'};

  &:hover {
    border: ${(props) =>
      props.outline
        ? '1px solid ' + props.theme.colors.primary
        : 'transparent'};
    background-color: ${(props) =>
      props.outline ? 'rgba(30, 136, 229, 0.08)' : '#007dcb'};
    /*  */
  }
  &:disabled {
    opacity: 0.5;
    cursor: auto;
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

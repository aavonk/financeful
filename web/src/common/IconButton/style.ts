import styled, { css } from 'styled-components';

type ButtonProps = {
  $small?: boolean;
  $danger?: boolean;
  $grey?: boolean;
  $active?: boolean;
};
export const StyledButton = styled.button<ButtonProps>`
  cursor: pointer;
  display: inline-flex;
  outline: 0;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  flex: 0 0 auto;
  color: ${(props) => props.theme.colors.textPrimary};
  padding: 12px;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  &:hover {
    background-color: ${({ theme }) => theme.effects.buttonHover};
  }
  ${(props) =>
    props.$small &&
    css`
      height: 32px;
      width: 32px;
      font-size: 0.95rem;
      padding: 0;
    `}
  ${(props) =>
    props.$danger &&
    css`
      &:hover {
        color: rgb(224, 36, 94);
        background-color: rgba(224, 36, 94, 0.2);
        transition: background-color 0.2s ease-in;
      }
    `}
   ${(props) =>
    props.$grey &&
    css`
      color: ${({ theme }) => theme.colors.textSecondary} !important;
    `}
      ${(props) =>
    props.$active &&
    css`
      background-color: ${({ theme }) => theme.effects.buttonHover};
    `}
`;

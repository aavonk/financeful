import styled, { css } from 'styled-components';

type ButtonProps = {
  fullWidth?: boolean;
  margin?: string;
  variant: string;
};
export const StyledButton = styled.button<ButtonProps>`
  font-size: 1rem;
  min-width: 64px;
  font-weight: 500;
  line-height: 1.35;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  position: relative;
  outline: 0;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  transition: background-color 0.2s ease-in-out;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: ${(props) => (props.margin ? props.margin : '0')};

  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }

  ${({ variant }) =>
    variant === 'cubed' &&
    css`
      border-radius: 0.25em;
      font-size: 0.875rem;
      width: 1em;
      height: 1em;
      min-width: 0;
      padding: 0;
      background-color: ${({ theme }) => theme.colors.primary};
    `}

  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: ${({ theme }) => theme.colors.primary};
      color: #000000;
      &:hover,
      :focus {
        background-color: rgb(21, 95, 160);
      }
    `};

  ${({ variant }) =>
    variant === 'outline' &&
    css`
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.primary};

      &:hover,
      :focus {
        background-color: rgba(30, 136, 229, 0.08);
      }
    `};

  ${({ variant }) =>
    variant === 'dark' &&
    css`
      background-color: ${({ theme }) => theme.colors.darkTwo};
      color: ${({ theme }) => theme.colors.textPrimary};

      &:hover,
      :focus {
        background-color: ${({ theme }) => theme.colors.darkThree};
      }
    `}
  ${({ variant }) =>
    variant === 'danger' &&
    css`
      background-color: ${({ theme }) => theme.colors.textError};
      color: ${({ theme }) => theme.colors.textPrimary};

      &:hover,
      :focus {
        background-color: rgb(202, 32, 85);
      }
    `}
    ${({ variant }) =>
    variant === 'danger-secondary' &&
    css`
      background-color: ${({ theme }) => theme.colors.darkTwo};
      color: ${({ theme }) => theme.colors.textError};

      &:hover,
      :focus {
        transition: background-color color 0.2s ease-in;
        background-color: ${({ theme }) => theme.colors.textError};
        color: #fff;
      }
    `}
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

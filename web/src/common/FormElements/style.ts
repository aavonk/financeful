import styled from 'styled-components';
import { theme } from '@Constants/theme';

type LabelProps = {
  disabled?: boolean;
};

type InputProps = {
  disabled?: boolean;
};

export const StyledLabel = styled.label<LabelProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 12px;
  font-weight: 500;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: ${theme.colors.textPrimary};
  position: relative;
  border-bottom: 2px solid transparent;
  transition: border-color 125ms ease-in, color 125ms ease-in;
  &:focus-within {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const StyledUnderlineInput = styled.input<InputProps>`
  flex: 1 0 auto;
  background: ${theme.colors.darkThree};
  font-weight: 500;
  width: 100%;
  font-size: 18px;
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 2px;
  box-shadow: none;
  color: ${theme.colors.textPrimary};
`;

export const BorderedLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 12px;
  font-weight: 400;
  /* font-size: 0.875rem; */
  font-size: 1rem;
  padding-left: 4px;
  letter-spacing: -0.4px;
  color: ${theme.colors.textSecondary};
  position: relative;
  border: 1px solid ${theme.colors.darkThree};
  border-radius: 4px;
  transition: border-color 125ms ease-in, color 125ms ease-in;
  &:focus-within {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;
export const TransparentInput = styled.input`
  flex: 1 0 auto;
  background: transparent;
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 2px;
  box-shadow: none;
  color: ${theme.colors.textPrimary};
`;

export const TransparentSelect = styled.select`
  flex: 1 0 auto;
  background: transparent;
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 2px;
  box-shadow: none;
  color: ${theme.colors.textPrimary};
`;

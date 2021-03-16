import styled from 'styled-components';
import { theme } from '@Constants/theme';
import { MdCheckBox } from 'react-icons/md';

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

export const CheckboxContainer = styled.span`
  color: rgba(255, 255, 255, 0.7);
  padding: 9px;
  flex: 0 0 auto;
  overflow: visible;
  font-size: 1.5rem;
  text-align: center;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: rgba(30, 136, 229, 0.08);
  }
`;

export const CheckboxLabel = styled.span`
  width: 100%;
  display: flex;
  align-items: inherit;
  justify-content: inherit;
`;

export const CheckInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: inherit;
  margin: 0;
  opacity: 0;
  padding: 0;
  z-index: 1;
`;

export const CheckboxFilled = styled(MdCheckBox)`
  color: #1e88e5;
  fill: #1e88e5;
`;

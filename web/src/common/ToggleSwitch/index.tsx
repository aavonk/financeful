import React from 'react';
import styled from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';
import { theme } from '@Constants/theme';

interface ToggleProps extends ReactSwitchProps {
  ariaLabel: string;
  uncheckedLabel: string;
  checkedLabel: string;
}

interface LabelProps {
  $right?: boolean;
  $left?: boolean;
}

const ToggleLabel = styled.div<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 12px;
  padding-right: 2px;
  margin-right: ${({ $right }) => ($right ? '50px' : '0')};
  margin-left: ${({ $left }) => ($left ? '40px' : '0')};
`;

function ToggleSwitch({
  ariaLabel,
  uncheckedLabel,
  checkedLabel,
  checked,
  onChange,
}: ToggleProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      onColor="#323d4d"
      offColor="#242c37"
      onHandleColor={theme.colors.primary}
      height={20}
      width={100}
      aria-label={ariaLabel}
      uncheckedIcon={<ToggleLabel $right>{uncheckedLabel}</ToggleLabel>}
      checkedIcon={<ToggleLabel $left>{checkedLabel}</ToggleLabel>}
    />
  );
}

export default ToggleSwitch;

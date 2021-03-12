import * as React from 'react';
import { StyledUnderlineInput, StyledLabel } from './style';

type InputTypes = {
  disabled?: boolean;
  id?: string;
  children: React.ReactNode;
  htmlFor?: string;
  type: 'text' | 'password';
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) => void;
  value: string;
  autoFocus?: boolean | string;
};

export function UnderlineInput(props: InputTypes) {
  return (
    <StyledLabel disabled={props.disabled} htmlFor={props.id}>
      {props.children}
      <StyledUnderlineInput
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
      />
    </StyledLabel>
  );
}

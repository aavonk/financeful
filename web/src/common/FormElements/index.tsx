/* eslint-disable react/display-name */
import DatePicker from 'react-datepicker';
import { DatePickerStyles } from '@Globals/datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as React from 'react';
import {
  StyledUnderlineInput,
  StyledLabel,
  BorderedLabel,
  TransparentInput,
  TransparentSelect,
  Prefix,
  StyledError,
} from './style';

type InputTypes = {
  disabled?: boolean;
  id?: string;
  children: React.ReactNode;
  htmlFor?: string;
  type: 'text' | 'password' | 'date';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus?: boolean;
  withPrefix?: boolean;
  prefix?: string;
  ariaDescribedBy?: string;
  required?: boolean;
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
        aria-describedby={props.ariaDescribedBy}
        aria-required={props.required}
      />
    </StyledLabel>
  );
}

export const BorderedInput = React.forwardRef<HTMLInputElement, InputTypes>(
  (props, ref) => {
    return (
      <BorderedLabel htmlFor={props.id}>
        {props.children}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {props.withPrefix && <Prefix>{props.prefix}</Prefix>}
          <TransparentInput
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            onBlur={props.onBlur}
            ref={ref}
            aria-describedby={props.ariaDescribedBy}
            aria-required={props.required}
          />
        </div>
      </BorderedLabel>
    );
  },
);

type SelectProps = {
  label: string;
  // children: React.DetailedHTMLProps<
  //   React.OptionHTMLAttributes<HTMLOptionElement>,
  //   HTMLOptionElement
  // >[];
  children: React.ReactNode;
  value: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  ariaDescribedBy?: string;
  required?: boolean;
  id?: string;
  'data-testid'?: string;
};
export function BorderedSelect(props: SelectProps) {
  return (
    <BorderedLabel>
      {props.label}
      <TransparentSelect
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        aria-describedby={props.ariaDescribedBy}
        aria-required={props.required}
        id={props.id}
        data-testid={props['data-testid']}
      >
        {props.children}
      </TransparentSelect>
    </BorderedLabel>
  );
}

type ErrorProps = {
  children: string | null;
  id?: string;
};

export function ErrorMessage({ children, id }: ErrorProps) {
  return (
    <StyledError role="alert" id={id}>
      {children}
    </StyledError>
  );
}

type DateProps = {
  selected: Date | null;
  label: string;
  onChange: (date: Date, event: React.SyntheticEvent<any, Event> | undefined) => void;
};
export const BorderedDatePicker = React.forwardRef<HTMLLabelElement, DateProps>(
  (props, ref) => {
    return (
      <BorderedLabel ref={ref}>
        {props.label}
        <DatePickerStyles>
          <DatePicker
            selected={props.selected}
            onChange={props.onChange}
            calendarClassName="fin"
            className="fin--input"
          />
        </DatePickerStyles>
      </BorderedLabel>
    );
  },
);

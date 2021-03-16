/* eslint-disable react/display-name */
import * as React from 'react';
import {
  StyledUnderlineInput,
  StyledLabel,
  CheckboxContainer,
  CheckInput,
  CheckboxLabel,
  CheckboxFilled,
} from './style';

import { CheckFilled, CheckOutline } from '@Common/Icons';

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
  autoFocus?: boolean;
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

// type CheckboxProps = {}
//   ref?: React.Ref<HTMLInputElement>
// }
//@ts-ignore
// const IndeterminateCheckbox = React.forwardRef<React.Ref | null>(
//   //@ts-ignore
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || defaultRef;

//     React.useEffect(() => {
//       //@ts-ignore
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <CheckboxContainer>
//           <CheckboxLabel>
//             <CheckInput type="checkbox" ref={resolvedRef} {...rest} />
//           </CheckboxLabel>
//           {checked ? <CheckboxFilled /> : <CheckOutline />}
//         </CheckboxContainer>
//       </>
//     );
//   },
// );

export function Checkbox() {
  const [checked, setChecked] = React.useState(false);
  return (
    <CheckboxContainer>
      <CheckboxLabel>
        <CheckInput
          type="checkbox"
          aria-label="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {checked ? (
          <CheckboxFilled focusable="false" aria-hidden="true" />
        ) : (
          <CheckOutline focusable="false" aria-hidden="true" />
        )}
      </CheckboxLabel>
    </CheckboxContainer>
  );
}

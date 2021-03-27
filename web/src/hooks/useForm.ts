import { useState, ChangeEvent, FormEvent } from 'react';

// Reference to this hook: https://felixgerschau.com/react-hooks-form-validation-typescript/

// EXAMPLE USAGE:
/* 
const { handleSubmit, handleChange, values, errors } = useForm({
  validations: {
    name: {
      pattern: {
        value: '^[A-Za-z]*$',
        message: "You're not allowed to...",
      },
    },
    age: {
      custom: {
        isValid: (value) => parseInt(value, 10) > 17,
        message: 'You have to be at least 18 years old.',
      },
    },
    password: {
      required: {
        value: true,
        message: 'This field is required',
      },
      custom: {
        isValid: (value) => value.length > 6,
        message: 'The password needs to be at...',
      },
    },
  },
});

*/

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Record<keyof T, string>;
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/ban-types
export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValue?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [values, setValues] = useState<T>((options?.initialValue || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({} as ErrorRecord<T>);

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S,
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {} as ErrorRecord<T>;
      for (const key in validations) {
        const value = values[key];
        const validation = validations[key];

        // REQUIRED
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        // PATTERN
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        // CUSTOM

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({} as ErrorRecord<T>);

    if (options?.onSubmit) {
      options.onSubmit();
      setValues((options?.initialValue || {}) as T);
    }
  };

  return {
    values,
    handleChange,
    handleSubmit,

    errors,
  };
};

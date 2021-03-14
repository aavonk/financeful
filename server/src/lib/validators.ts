type Fields = {
  displayName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export const validateRegisterFields = (
  displayName: string,
  email: string,
  password: string,
  passwordConfirmation: any,
) => {
  const errors: Fields = {};

  if (displayName.trim() === '') {
    errors.displayName = 'This field is required';
  }
  if (email.trim() === '') {
    errors.email = 'This field is required';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password === '' || password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email: string, password: string) => {
  const errors: Fields = {};
  if (email.trim() === '') {
    errors.email = 'This field is required';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (password.trim() === '') {
    errors.password = "What's your password?";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

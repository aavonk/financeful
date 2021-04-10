import { User } from '@Shared/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InputFields, ValidationResponse, IAuthUtils } from '../authUtils';

//TODO: Delete Lib/validators.ts

class AuthUtils implements IAuthUtils {
  constructor() {}

  generateToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXP,
    });
  }
  async hashPasword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  async verifyPassword(
    passwordGiven: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordGiven, passwordToCompare);
  }

  validateLoginInput(email: string, password: string): ValidationResponse {
    const errors: InputFields = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
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
  }

  validateRegisterInput(
    displayName: string,
    email: string,
    password: string,
    passwordConfirmation: any,
  ): ValidationResponse {
    const errors: InputFields = {};

    if (displayName.trim() === '') {
      errors.displayName = 'Name is required';
    }
    if (email.trim() === '') {
      errors.email = 'Email is required';
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
  }
}

const authUtils = new AuthUtils();

export { authUtils };

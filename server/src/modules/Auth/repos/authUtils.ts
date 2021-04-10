import { User } from '@Shared/types';

export type InputFields = {
  displayName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export type ValidationResponse = {
  errors: InputFields;
  valid: boolean;
};

export interface IAuthUtils {
  verifyPassword(
    passwordGiven: string,
    passwordToCompare: string,
  ): Promise<boolean>;

  validateLoginInput(email: string, password: string): ValidationResponse;
  validateRegisterInput(
    displayName: string,
    email: string,
    password: string,
    passwordConfirmation: any,
  ): ValidationResponse;
  generateToken(user: User): string;
  hashPasword(password: string): Promise<string>;
}

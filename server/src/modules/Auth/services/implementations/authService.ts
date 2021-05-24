import { UserInputError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IAuthService } from '../authService'
import { IUserRepo } from '@Modules/Users/repos/userRepo'
import { User } from '@Shared/types'
import { RegisterInput } from '@Modules/Auth/resolvers/types'


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


export class AuthService implements IAuthService {
  private readonly userRepo: IUserRepo
  private readonly emailRegex: RegExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-z]\.)+[a-zA-Z]{2,9})$/
 
  constructor(userRepo: IUserRepo) {
   this.userRepo = userRepo
 }

  async handleLogin(email: string, password: string): Promise<User> {
    const { valid, errors } = this.validateLoginInput(email, password);

    if (!valid) {
      throw new UserInputError('Invalid', { errors });
    }

    const user = await this.userRepo.findByEmail(email)

    if (!user) {
      throw new UserInputError('Invalid Credentials', {
        errors: {
          general: 'Invalid Credentials',
        },
      });
    }

    const passwordMatch = await this.verifyPassword(
      password,
      user.password!,
    );

    if (!passwordMatch) {
      throw new UserInputError('Invalid Credentials', {
        errors: {
          general: 'Invalid Credentials',
        },
      });
    }

    const token = this.generateToken(user)

    return {
      ...user,
      token
    }
 }

  async handleRegister(input: RegisterInput): Promise<User> {
    const { valid, errors } = this.validateRegisterInput(input)

    if (!valid) {
      throw new UserInputError('Invalid information provided', { errors });
    }

    const existingUser = await this.userRepo.findByEmail(input.email)

    if (existingUser) {
      throw new UserInputError(
        'There is already an account associated with this email address',
        {
          errors: {
            email: 'This email is taken',
          },
        },
      );
    }

    const hashedPassword = await this.hashPasword(input.password)
    const firstName = input.displayName.split(' ')[0];

    const newUser = await this.userRepo.createOne({
      displayName: input.displayName,
      email: input.email,
      firstName,
      password: hashedPassword,
    })

    const token = this.generateToken(newUser)

    return {
      ...newUser,
      token
    }
  }

  private generateToken(user: User): string {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXP,
    });
  }

  private async hashPasword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  private async verifyPassword(
    passwordGiven: string,
    passwordToCompare: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordGiven, passwordToCompare);
  }

  private validateLoginInput(email: string, password: string): ValidationResponse {
    const errors: InputFields = {};
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else {
      if (!email.match(this.emailRegex)) {
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

  private validateRegisterInput(input: RegisterInput): ValidationResponse {
    const { displayName, email, password, passwordConfirmation } = input;
    const errors: InputFields = {};

    if (displayName.trim() === '') {
      errors.displayName = 'Name is required';
    }
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else {
      if (!email.match(this.emailRegex)) {
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
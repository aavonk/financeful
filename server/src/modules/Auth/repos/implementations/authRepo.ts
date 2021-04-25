import { UserInputError } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import { User } from '@Shared/types';
import { IAuthRepo } from '../authRepo';
import { authUtils } from './authUtils';
import { RegisterInput } from '@Modules/Auth/resolvers/types';

export class AuthRepo implements IAuthRepo {
  private client: PrismaClient;
  constructor(database: PrismaClient) {
    this.client = database;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.client.user.findUnique({
      where: {
        email,
      },
    });
  }

  async handleLogin(email: string, password: string): Promise<User> {
    const { valid, errors } = authUtils.validateLoginInput(email, password);

    if (!valid) {
      throw new UserInputError('Invalid', { errors });
    }

    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UserInputError('Invalid Credentials', {
        errors: {
          general: 'Invalid Credentials',
        },
      });
    }

    const passwordMatch = await authUtils.verifyPassword(
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

    const token = authUtils.generateToken(user);

    return {
      ...user,
      token,
    };
  }

  async handleRegister(input: RegisterInput): Promise<User> {
    const { errors, valid } = authUtils.validateRegisterInput(input);

    if (!valid) {
      throw new UserInputError('Invalid information provided', { errors });
    }

    const existingUser = await this.findUserByEmail(input.email);

    if (existingUser) {
      throw new UserInputError(
        'There is already an account associated with this email address',
        {
          errors: {
            email: 'This email has an account',
          },
        },
      );
    }

    const hashedPassword = await authUtils.hashPasword(input.password);
    const firstName = input.displayName.split(' ')[0];

    const newUser = await this.client.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        displayName: input.displayName,
        firstName: firstName,
      },
    });

    const token = authUtils.generateToken(newUser);

    return {
      ...newUser,
      token,
    };
  }
}

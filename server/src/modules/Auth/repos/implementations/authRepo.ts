import { UserInputError } from 'apollo-server-express';
import { DataSource } from '@Shared/core/DataSource';
import { User } from '@Shared/types';
import { IAuthRepo } from '../authRepo';
import { authUtils } from './authUtils';

export class AuthRepo extends DataSource implements IAuthRepo {
  constructor() {
    super();
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
}

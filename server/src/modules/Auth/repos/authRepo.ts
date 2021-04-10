import { User } from '@Shared/types';

export interface IAuthRepo {
  findUserByEmail(email: string): Promise<User | null>;
  handleLogin(email: string, password: string): Promise<User>;
}

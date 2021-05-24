import { User } from '@Shared/types';
import { RegisterInput } from '../resolvers/types';


export interface IAuthRepo {
  findUserByEmail(email: string): Promise<User | null>;
  handleLogin(email: string, password: string): Promise<User>;
  handleRegister(input: RegisterInput): Promise<User>;
}

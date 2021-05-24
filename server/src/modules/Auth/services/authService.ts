import { User } from "@Shared/types";
import { RegisterInput } from '@Modules/Auth/resolvers/types';


export interface IAuthService {
  handleLogin(email: string, password: string): Promise<User>
  handleRegister(input: RegisterInput): Promise<User> 
}
import { User } from '@Shared/types';

export type ICreateUser = {
  email: string;
  password: string;
  firstName: string;
  displayName: string;
}
export interface IUserRepo {
  findOne(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createOne(input: ICreateUser): Promise<User>
}

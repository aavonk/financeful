import { User } from '@Shared/types';

export interface IUserRepo {
  findOne(userId: string): Promise<User | null>;
}

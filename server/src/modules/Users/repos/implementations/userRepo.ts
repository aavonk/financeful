import { DataSource } from '@Shared/core/DataSource';
import { User } from '@Shared/types';
import { IUserRepo } from '../userRepo';

export class UserRepo extends DataSource implements IUserRepo {
  constructor() {
    super();
  }

  public async findOne(userId: string): Promise<User | null> {
    return await this.client.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}

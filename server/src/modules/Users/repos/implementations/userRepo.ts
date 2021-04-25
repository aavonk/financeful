import { IDataBase } from '@Shared/database/IDataBase';
import { User } from '@Shared/types';
import { IUserRepo } from '../userRepo';

export class UserRepo implements IUserRepo {
  private client: IDataBase;
  constructor(database: IDataBase) {
    this.client = database;
  }

  public async findOne(userId: string): Promise<User | null> {
    return await this.client.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}

import { IDataBase } from '@Shared/database/IDataBase';
import { ICategoryRepo } from '../categoryRepo';
import { Category } from '@Shared/types';

export class CategoryRepo implements ICategoryRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }
  async findAll(userId: string): Promise<Category[]> {
    return await this.client.category.findMany({
      where: {
        userId,
      },
    });
  }
  async findExisting(userId: string, name: string): Promise<Category | null> {
    return await this.client.category.findFirst({
      where: {
        userId,
        name,
      },
    });
  }
  async createOne(userId: string, name: string): Promise<Category> {
    return await this.client.category.create({
      data: {
        userId,
        name,
      },
    });
  }

  async updateOne(categoryId: string, name: string): Promise<Category> {
    return await this.client.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
  }

  async deleteOne(categoryId: string): Promise<void> {
    await this.client.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}

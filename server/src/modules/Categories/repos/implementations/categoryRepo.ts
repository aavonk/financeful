import { IDataBase } from '@Shared/database/IDataBase';
import { ICategoryRepo } from '../categoryRepo';
import { Category } from '@Shared/types';
import { CategoryCreateInput } from '../../types/category.types';

export class CategoryRepo implements ICategoryRepo {
  private client: IDataBase;

  constructor(database: IDataBase) {
    this.client = database;
  }

  private capitalizeFirstLetter(s: string): string {
    return s && s[0].toUpperCase() + s.slice(1);
  }
  async findAll(userId: string): Promise<Category[]> {
    return await this.client.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
  async findExisting(userId: string, name: string): Promise<Category | null> {
    const lowerCaseName = name.toLowerCase();
    const upperCaseName = this.capitalizeFirstLetter(name);

    return await this.client.category.findFirst({
      where: {
        userId,
        OR: [
          {
            name: {
              equals: lowerCaseName,
            },
          },
          {
            name: {
              equals: upperCaseName,
            },
          },
        ],
      },
    });
  }
  async createOne(
    userId: string,
    input: CategoryCreateInput,
  ): Promise<Category> {
    return await this.client.category.create({
      data: {
        userId,
        ...input,
      },
    });
  }

  async updateOne(
    categoryId: string,
    input: CategoryCreateInput,
  ): Promise<Category> {
    return await this.client.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...input,
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

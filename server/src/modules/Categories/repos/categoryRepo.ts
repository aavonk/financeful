import { Category } from '@Shared/types';

export interface ICategoryRepo {
  findAll(userId: string): Promise<Category[]>;
  findExisting(userId: string, name: string): Promise<Category | null>;
  createOne(userId: string, name: string): Promise<Category>;
  updateOne(categoryId: string, name: string): Promise<Category>;
  deleteOne(categoryId: string): Promise<void>;
}

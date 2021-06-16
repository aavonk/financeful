import { Category } from '@Shared/types';
import { CategoryCreateInput } from '../types/category.types';

export interface ICategoryRepo {
  findAll(userId: string): Promise<Category[]>;
  findExisting(userId: string, name: string): Promise<Category | null>;
  createOne(userId: string, input: CategoryCreateInput): Promise<Category>;
  updateOne(categoryId: string, input: CategoryCreateInput): Promise<Category>;
  deleteOne(categoryId: string): Promise<void>;
}

import { Resolver, Authorized, Ctx, Query, Mutation, Arg } from 'type-graphql';
import { Context, Category } from '@Shared/types';
import {
  CategoryCreateInput,
  CategoryCreateResult,
} from '../types/category.types';

@Resolver()
export class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async getCategories(
    @Ctx() { user, categoryRepo }: Context,
  ): Promise<Category[]> {
    const categories = await categoryRepo.findAll(user.id);

    return categories;
  }

  @Authorized()
  @Mutation(() => CategoryCreateResult)
  async createCategory(
    @Arg('input') input: CategoryCreateInput,
    @Ctx() { user, categoryRepo }: Context,
  ): Promise<CategoryCreateResult> {
    const existingCategory = await categoryRepo.findExisting(
      user.id,
      input.name,
    );

    if (existingCategory) {
      return {
        error: {
          message: `${existingCategory.name} is already in your categories`,
        },
      };
    }
    const newCategory = await categoryRepo.createOne(user.id, input);

    return { category: newCategory };
  }

  @Authorized()
  @Mutation(() => Category)
  async updateCategory(
    @Arg('name') name: string,
    @Arg('categoryId') categoryId: string,
    @Ctx() { categoryRepo }: Context,
  ): Promise<Category> {
    return await categoryRepo.updateOne(categoryId, name);
  }

  @Authorized()
  @Mutation(() => String)
  async deleteCategory(
    @Arg('categoryId') categoryId: string,
    @Ctx() { categoryRepo }: Context,
  ): Promise<String> {
    await categoryRepo.deleteOne(categoryId);

    return 'Category successfully removed';
  }
}

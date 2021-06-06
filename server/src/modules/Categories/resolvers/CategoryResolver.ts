import { UserInputError } from 'apollo-server-express';
import { Resolver, Authorized, Ctx, Query, Mutation, Arg } from 'type-graphql';
import { Context, Category } from '@Shared/types';
import { CategoryCreateInput } from '../types/category.types';

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
  @Mutation(() => Category)
  async createCategory(
    @Arg('input') input: CategoryCreateInput,
    @Ctx() { user, categoryRepo }: Context,
  ): Promise<Category> {
    const existingCategory = await categoryRepo.findExisting(
      user.id,
      input.name,
    );

    if (existingCategory) {
      throw new UserInputError(
        `${existingCategory.name} category already exists.`,
      );
    }
    const newCategory = await categoryRepo.createOne(user.id, input);

    return newCategory;
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

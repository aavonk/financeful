import { UserInputError } from 'apollo-server-errors';
import { Resolver, Authorized, Ctx, Query, Mutation, Arg } from 'type-graphql';
import { Category } from '../../types/Category';
import { Context } from '../../types/Context';
// import {UserInputError} from 'apollo-server-express'

@Resolver()
export class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async getCategories(@Ctx() { user, prisma }: Context): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
    });

    return categories;
  }

  @Authorized()
  @Mutation(() => Category)
  async createCategory(
    @Arg('name') name: string,
    @Ctx() { user, prisma }: Context,
  ): Promise<Category> {
    const existingCategory = await prisma.category.findFirst({
      where: {
        userId: user.id,
        name,
      },
    });

    if (existingCategory) {
      throw new UserInputError(
        `${existingCategory.name} category already exists.`,
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        userId: user.id,
        name,
      },
    });

    return newCategory;
  }

  @Authorized()
  @Mutation(() => Category)
  async updateCategory(
    @Arg('name') name: string,
    @Arg('categoryId') categoryId: string,
    @Ctx() { prisma }: Context,
  ): Promise<Category> {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteCategory(
    @Arg('categoryId') categoryId: string,
    @Ctx() { prisma }: Context,
  ): Promise<String> {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return 'Category successfully removed';
  }
}

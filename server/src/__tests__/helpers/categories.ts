import { PrismaClient } from '@prisma/client';
import { CategoryCreateInput } from '@Modules/Categories/types/category.types';
import { Category } from '@Shared/types';

export const createCategories = async (
  categories: CategoryCreateInput[],
  prisma: PrismaClient,
  userId: string,
) => {
  const cats: Category[] = [];
  const items = categories.map((item) => ({ ...item, userId }));

  for (const i of items) {
    const category = await prisma.category.create({
      data: i,
    });

    cats.push(category);
  }

  return cats;
};

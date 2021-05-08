import { PrismaClient } from '.prisma/client';
import { Category } from '../../src/shared/types';

export const categories = [
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Groceries',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Drinks & Snacks',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Rent',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Utilities',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Entertainment',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Pets/Pet Care',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Electronics',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Transfers',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Savings',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Paycheck',
  },
  {
    userId: 'cknhv5hlp000204qsu4buhqgr',
    name: 'Investment Income',
  },
];

export const createCategories = async (
  userId: string,
  prisma: PrismaClient,
): Promise<Category[]> => {
  const newCategories = categories.map((cat) => ({ ...cat, userId: userId }));
  const cats: Category[] = [];
  for (let category of newCategories) {
    const cat = await prisma.category.create({
      data: category,
    });
    cats.push(cat);
  }

  return cats;
};

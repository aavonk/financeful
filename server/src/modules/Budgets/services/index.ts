import { BudgetRepo } from '../repos/implementations/budgetRepo';
import { BudgetService } from './implementations/budgetService';
import prisma from '@Shared/database/prisma';

const budgetService = new BudgetService(new BudgetRepo(prisma));

export { budgetService };

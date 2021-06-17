import { Budget } from '@Shared/types';

export interface IBudgetRepo {
  createOne: () => Promise<Budget>;
}

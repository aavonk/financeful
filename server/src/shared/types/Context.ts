import type { ExpressContext } from 'apollo-server-express';
import type { ITransferRepo } from '@Modules/Transactions/repos/transferRepo';
import type { IAccountRepo } from '@Modules/BankAccounts/repos/accountRepo';
import type { IAccountDataRepo } from '@Modules/BankAccounts/repos/accountDataRepo';
import type { ICategoryRepo } from '@Modules/Categories/repos/categoryRepo';
import type { IUserRepo } from '@Modules/Users/repos/userRepo';
import type { IAggregateAccountData } from '@Modules/BankAccounts/repos/aggregateAccountData';
import type { IInsightsService } from '@Modules/BankAccounts/services/insightsService';
import type { ITransactionService } from '@Modules/Transactions/services/transactionService';
import type { IAuthService } from '@Modules/Auth/services/authService';
import type { IBudgetService } from '@Modules/Budgets/services/budgetService';

interface Services {
  insightService: IInsightsService;
  transactionService: ITransactionService;
  authService: IAuthService;
  budgetService: IBudgetService;
}

export interface Context extends ExpressContext {
  user: {
    id: string;
  };
  transferRepo: ITransferRepo;
  accountRepo: IAccountRepo;
  accountDataRepo: IAccountDataRepo;
  aggregateAccountDataRepo: IAggregateAccountData;
  categoryRepo: ICategoryRepo;
  userRepo: IUserRepo;
  services: Services;
}

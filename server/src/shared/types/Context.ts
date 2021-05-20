import { ExpressContext } from 'apollo-server-express';
import { ITransferRepo } from '@Modules/Transactions/repos/transferRepo';
import { IAccountRepo } from '@Modules/BankAccounts/repos/accountRepo';
import { IAccountDataRepo } from '@Modules/BankAccounts/repos/accountDataRepo';
import { IAuthRepo } from '@Modules/Auth/repos/authRepo';
import { ICategoryRepo } from '@Modules/Transactions/repos/categoryRepo';
import { IUserRepo } from '@Modules/Users/repos/userRepo';
import { IAggregateAccountData } from '@Modules/BankAccounts/repos/aggregateAccountData';
import { IInsightsService } from '@Modules/BankAccounts/services/insightsService';
import { ITransactionService } from '@Modules/Transactions/services/transactionService';

interface Services {
  insightService: IInsightsService;
  transactionService: ITransactionService;
}

export interface Context extends ExpressContext {
  user: {
    id: string;
  };
  transferRepo: ITransferRepo;
  accountRepo: IAccountRepo;
  accountDataRepo: IAccountDataRepo;
  aggregateAccountDataRepo: IAggregateAccountData;
  authRepo: IAuthRepo;
  categoryRepo: ICategoryRepo;
  userRepo: IUserRepo;
  services: Services;
}

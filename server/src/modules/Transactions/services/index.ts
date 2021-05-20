import { TransactionService } from './implementations/transactionService';
import { AccountRepo } from '@Modules/BankAccounts/repos/implementations/accountRepo';
import { TransactionRepo } from '@Modules/Transactions/repos/implementations/transactionRepo';
import prisma from '@Shared/database/prisma';

const accountRepo = new AccountRepo(prisma);
const transactionRepo = new TransactionRepo(prisma);

const transactionService = new TransactionService(transactionRepo, accountRepo);

export { transactionService };

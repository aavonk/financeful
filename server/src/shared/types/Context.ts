import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { TransferService } from '@Modules/Transactions/repos/TransferRepo';
export interface Context extends ExpressContext {
  prisma: PrismaClient;
  user: {
    id: string;
  };
  transferService: TransferService;
}

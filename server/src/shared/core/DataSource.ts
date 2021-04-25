import { PrismaClient } from '@prisma/client';
import prisma from '../database/prisma';

export abstract class DataSource {
  protected client: PrismaClient;
  protected accountModel: PrismaClient['account'];
  constructor() {
    this.client = prisma;
    this.accountModel = prisma.account;
  }
}

import { PrismaClient } from '@prisma/client';
import prisma from '../database/prisma';

export abstract class DataSource {
  protected client: PrismaClient;
  constructor() {
    this.client = prisma;
  }
}

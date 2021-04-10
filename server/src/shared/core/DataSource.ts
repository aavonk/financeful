import { PrismaClient } from '@prisma/client';
import prisma from '../database/prisma';

export class DataSource {
  public client: PrismaClient;
  constructor() {
    this.client = prisma;
  }
}

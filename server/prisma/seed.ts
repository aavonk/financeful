const chalk = require('chalk');
import ask from 'prompt';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../src/modules/Auth/services/implementations/authService';
import { UserRepo } from '../src/modules/Users/repos/implementations/userRepo';
import { RegisterInput } from '../src/modules/Auth/resolvers/types';
import { User } from '../src/shared/types';
import { createCategories } from './seed-data/categories';
import { createBankAccounts } from './seed-data/accounts';
import { createBankBalances } from './seed-data/balances';
import { createTransactions } from './seed-data/transactions';

const prisma = new PrismaClient();

const schema = {
  properties: {
    name: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: chalk.red('Name must be only letters, spaces, or dashes'),
      required: true,
      description: chalk.green("What's your name?"),
      type: 'string',
    },
    email: {
      pattern: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-z]\.)+[a-zA-Z]{2,9})$/,
      message: chalk.red('Please enter a valid email address'),
      required: true,
      description: chalk.green("What's your email?"),
      type: 'string',
    },
    password: {
      hidden: true,
      replace: '*',
      required: true,
      type: 'string',
      description: chalk.green('Password ?'),
      message: chalk.red('Password must be 6 characters'),
      conform: function (value: any) {
        return value.length >= 6;
      },
    },
    passwordConfirmation: {
      hidden: true,
      replace: '*',
      required: true,
      type: 'string',
      description: chalk.green('Confirm password'),
      message: chalk.red("Password doesn't match the previous"),
      conform: function (value: any) {
        return ask.history('password')!.value === value;
      },
    },
  },
};

async function main() {
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));
  console.log(
    chalk`Welcome to {blue.bold Financeful}. Lets get started by seeding the database. \n`,
  );
  console.log("First let's create an account...");
  ask.start();
  //@ts-ignore
  const { name, email, password, passwordConfirmation } = await ask.get(schema);

  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));
  console.log(chalk.green('Creating awesomeness... hang tight \n \n'));
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));

  // ------- Create the User & Test User ---------------//
  const userRepo = new UserRepo(prisma);
  const auth = new AuthService(userRepo);

  const userValues: RegisterInput = {
    displayName: name as string,
    email: email as string,
    password: password as string,
    passwordConfirmation: passwordConfirmation as string,
  };

  const testUserValues: RegisterInput = {
    displayName: 'Test User',
    email: 'test@test.com',
    password: 'testing123',
    passwordConfirmation: 'testing123',
  };

  const user: User = await auth.handleRegister(userValues);
  const testUser: User = await auth.handleRegister(testUserValues);
  // ------- Create the Accounts ---------------//
  const accounts = await createBankAccounts(user.id, prisma);
  const testUserAccounts = await createBankAccounts(testUser.id, prisma);

  // ------- Create the Categories ---------------//
  const categories = await createCategories(user.id, prisma);
  const testCategories = await createCategories(testUser.id, prisma);

  // ------- Create the Bank Balances ---------------//
  await createBankBalances(user.id, accounts, prisma);
  await createBankBalances(testUser.id, testUserAccounts, prisma);

  // ------- Create the Transactions ---------------//

  await createTransactions(user.id, accounts, categories, prisma);
  await createTransactions(
    testUser.id,
    testUserAccounts,
    testCategories,
    prisma,
  );
}

main()
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

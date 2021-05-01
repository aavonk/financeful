const chalk = require('chalk');
import ask from 'prompt';
import { PrismaClient } from '@prisma/client';
import { AuthRepo } from '../src/modules/Auth/repos/implementations/authRepo';
import { RegisterInput } from '../src/modules/Auth/resolvers/types';
import { User, Account, Category } from '../src/shared/types';
import { categories } from './seed-data/categories';
import { accounts, getRandomAccountId } from './seed-data/accounts';
import { generateBalanceObjects } from './seed-data/balances';
import {
  makeTransactions,
  getRandomCategoryId,
} from './seed-data/transactions';
const prisma = new PrismaClient();

async function main() {
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
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));
  console.log(
    chalk`Welcome to {blue.bold Financeful}. Lets get started by seeding the database. \n`,
  );
  console.log("First let's create an account...");
  ask.start();
  //@ts-ignore
  const { name, email, password, passwordConfirmation } = await ask.get(schema);
  // const name = await ask.get(['name'])
  // const email = await ask.get(['email']) as unknown as string;
  // const password = await ask.get(['password']) as unknown as string;
  // const passwordConfirmation = await ask.get(['passwordConfirmation']) as unknown as string;

  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));
  console.log(chalk.green('Creating awesomeness... hang tight \n \n'));
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'));

  // ------- Create the User ---------------//
  const auth = new AuthRepo(prisma);

  const values: RegisterInput = {
    displayName: name as string,
    email: email as string,
    password: password as string,
    passwordConfirmation: passwordConfirmation as string,
  };
  const user: User = await auth.handleRegister(values);

  //add userId to accounts & categories

  // ------- Create the Accounts ---------------//
  const bankAccounts = accounts.map((account) => ({
    ...account,
    userId: user.id,
  }));

  const acct: Account[] = [];
  for (let account of bankAccounts) {
    const newAccount = await prisma.account.create({
      data: account,
    });
    acct.push(newAccount);
  }
  // ------- Create the Categories ---------------//
  const newCategories = categories.map((cat) => ({ ...cat, userId: user.id }));
  const cats: Category[] = [];
  for (let category of newCategories) {
    const cat = await prisma.category.create({
      data: category,
    });
    cats.push(cat);
  }
  // ------- Create the Bank Balances ---------------//

  const bankBalances = generateBalanceObjects().map((item) => {
    const accountId = getRandomAccountId(acct);
    return {
      ...item,
      userId: user.id,
      accountId,
    };
  });

  for (let balance of bankBalances) {
    await prisma.dailyBalances.create({
      data: balance,
    });
  }

  // ------- Create the Transactions ---------------//

  const transactionTemplates = makeTransactions(100).map((item) => ({
    ...item,
    categoryId: getRandomCategoryId(cats),
    isCashIn: item.amount > 0,
    isCashOut: item.amount < 0,
    isUncategorized: false,
    userId: user!.id!,
    accountId: getRandomAccountId(acct),
    amount: Number(item.amount) * 100,
    type: item.amount > 0 ? 'INCOME' : 'EXPENSE',
  }));

  for (let item of transactionTemplates) {
    await prisma.transaction.create({
      //@ts-ignore
      data: item,
    });
  }
}
main()
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

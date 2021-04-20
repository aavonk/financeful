const chalk = require('chalk')
import ask from 'prompt'
import { PrismaClient } from '@prisma/client'
import { AuthRepo } from '../src/modules/Auth/repos/implementations/authRepo'
import { RegisterInput } from '../src/modules/Auth/resolvers/types'
import { User } from '../src/shared/types'
import { categories } from './seed-data/categories'
import { accounts } from './seed-data/accounts'

const prisma = new PrismaClient()

async function main(){
  const schema = {
    properties: {
      name: {
        pattern: /^[a-zA-Z\s\-]+$/,
        message: chalk.red('Name must be only letters, spaces, or dashes'),
        required: true,
        description: chalk.green('What\'s your name?'),
        type: 'string',
      },
      email: {
        pattern: /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-z]\.)+[a-zA-Z]{2,9})$/,
        message: chalk.red('Please enter a valid email address'),
        required: true,
        description: chalk.green("What\'s your email?"),
        type: 'string',
      },
      password: {
        hidden: true,
        replace: '*',
        required: true,
        type: 'string',
        description: chalk.green('Password ?'),
        message: chalk.red('Password must be 6 characters'),
        conform: function(value: any) {
          return value.length >= 6
        },
      },
      passwordConfirmation: {
        hidden: true,
        replace: '*',
        required: true,
        type: 'string',
        description: chalk.green('Confirm password'),
        message: chalk.red('Password doesn\'t match the previous'),
        conform: function(value: any) {
          return ask.history('password')!.value === value
        }
      }
    }
  };
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'))
  console.log(chalk`Welcome to {blue.bold Financeful}. Lets get started by seeding the database. \n`);
  console.log('First let\'s create an account...')
  ask.start()
  //@ts-ignore
  const { name, email, password, passwordConfirmation } = await ask.get(schema)
  // const name = await ask.get(['name'])
  // const email = await ask.get(['email']) as unknown as string;
  // const password = await ask.get(['password']) as unknown as string;
  // const passwordConfirmation = await ask.get(['passwordConfirmation']) as unknown as string;
 

  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'))
  console.log(chalk.green('Creating awesomeness... hang tight \n \n'))
  console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'))

  const auth = new AuthRepo(prisma)

  const values: RegisterInput = {displayName: name as string, email: email as string, password: password as string, passwordConfirmation: passwordConfirmation as string}
  const user: User = await auth.handleRegister(values)
  
  const bankAccounts = accounts.map((account) => ({...account, userId: user.id}));
  const newCategories = categories.map((cat) => ({...cat, userId: user.id }))

  for (let account of bankAccounts) {
    await prisma.account.create({
      data: account
    })
  }

  for( let category of newCategories) {
    await prisma.category.create({
      data: category
    })
  }

}

main().catch(e => {
  console.log(e.message)
  process.exit(1)
}).finally(() => {
  prisma.$disconnect()
})
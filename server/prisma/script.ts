// const chalk = require('chalk')
// import ask from 'prompt'
// // import {PrismaClient} from '@prisma/client'
// // import { AuthRepo } from '../src/modules/Auth/repos/implementations/authRepo'
// // import { RegisterInput } from '../src/modules/Auth/resolvers/types'

// // import { accounts} from './seed-data/accounts'
// // import {categories} from './seed-data/categories'

// // const prisma = new PrismaClient()
// // const auth = new AuthRepo()

// async function script(){
//   console.log(chalk.blue('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \n'))
//   console.log(chalk`Welcome to {blue.bold Financeful}. Lets get started by seeding the database. \n`);
//   console.log('First let\'s create an account...')
//   ask.start()
//   const name = await ask.get(['name']) as unknown as string;
//   const email = await ask.get(['email']) as unknown as string;
//   const password = await ask.get(['password']) as unknown as string;
//   const confirmPassword = await ask.get(['confirmPassword']) as unknown as string;

//   const values = {displayName: name, email, password, confirmPassword}
//   console.log(values)

//   // const registerInput: RegisterInput = {displayName: name, email, }

// }

// script()
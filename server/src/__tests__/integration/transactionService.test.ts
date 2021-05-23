import { PrismaClient } from '@prisma/client'
import { setupEnv, createUser, createAccount } from '../helpers/'
import { TransactionService } from '@Modules/Transactions/services/implementations/transactionService'
import { TransactionRepo } from '@Modules/Transactions/repos/implementations/transactionRepo'
import { AccountRepo } from '@Modules/BankAccounts/repos/implementations/accountRepo'
import { User } from '@Shared/types'
import { TransactionInput } from '@Modules/Transactions/types/transaction.types'

let prisma: PrismaClient;
let transactionService: TransactionService
let transactionRepo: TransactionRepo
let accountRepo: AccountRepo
let user: User

beforeAll(async () => {
  setupEnv()
  prisma = new PrismaClient()
  transactionRepo = new TransactionRepo(prisma)
  accountRepo = new AccountRepo(prisma)
  transactionService = new TransactionService(transactionRepo, accountRepo)
  user = await createUser(prisma)
})

afterEach(async () => {
  const transactionDelete = prisma.transaction.deleteMany()
  const accountDelete = prisma.account.deleteMany()

  await prisma.$transaction([transactionDelete, accountDelete])
})

afterAll(async () => {
  console.log('⚡ 🎯 Deleting Tables ...')
  await prisma.user.deleteMany()
  await prisma.$disconnect()
})

const setupTransaction = async () => {
  const account = await createAccount(prisma, user.id)
  const date = new Date()
  const input: TransactionInput = {
    accountId: account.id,
    amount: 10,
    date: date,
    payee: 'Some place',
    type: 'INCOME', 
  }

  return { account, date, input }
}

describe('Transaction Creation', () => {
 it ('Formats the transaction correctly', async () => {
   const {input, account} = await setupTransaction()

  const transaction = await transactionService.createOne(input, user.id)

   expect(transaction).toEqual({
    ...input,
    account: {
      accountName: account.accountName,
      id: account.id,
    },
    categoryId: null,
    category: null,
    description: null,
    id: transaction.id,
    isCashIn: true,
    isCashOut: false,
    isTransfer: false,
    isUncategorized: true,
    payee: input.payee,
    transferId: null,
    userId: user.id,
  })
 })

 it ('Updates the Account Balance correctly given an income transaction', async () => {
  const {input, account} = await setupTransaction()
  

  await transactionService.createOne(input, user.id)

  const foundAccount = await accountRepo.getOneAccount(account.id, user.id)
  
  expect(foundAccount?.balance).toBe(10)
 })

 it ('Updates the Account Balance correctly given an expense transaction', async () => {
  const {input, account} = await setupTransaction()
  
  const newInput: TransactionInput = {...input, amount: 100, type: 'EXPENSE'}

  await transactionService.createOne(newInput, user.id)

  const foundAccount = await accountRepo.getOneAccount(account.id, user.id)
  
  expect(foundAccount?.balance).toBe(-100)
 })
})

describe('Deleting Transactions', () => {
  it ('Updates the account balance - deleting income', async () => {
    const {input, account } = await setupTransaction()
    const newInput = {...input, amount: 100}
    const transaction =  await transactionService.createOne(newInput, user.id)
    const foundAccount = await accountRepo.getOneAccount(account.id, user.id)

    expect(foundAccount?.balance).toBe(100)
    await transactionService.deleteOne(transaction.id,user.id )
    
    const foundAccount2 = await accountRepo.getOneAccount(account.id, user.id)
    expect(foundAccount2?.balance).toBe(0)
  })
  it ('Updates the account balance - deleting expense', async () => {
    const {input, account } = await setupTransaction()
    const newInput = {...input, amount: 100, type: 'EXPENSE'}
    const transaction =  await transactionService.createOne(newInput, user.id)
    const foundAccount = await accountRepo.getOneAccount(account.id, user.id)

    expect(foundAccount?.balance).toBe(-100)
    await transactionService.deleteOne(transaction.id,user.id )
    
    const foundAccount2 = await accountRepo.getOneAccount(account.id, user.id)
    expect(foundAccount2?.balance).toBe(0)
  })
})

describe ('Updating a transaction', () => {
  it ('Updates account when expense changes to income', async () => {
    const { account, input } = await setupTransaction()
    const newInput = {...input, amount: 100, type: 'INCOME'}
    const transaction = await transactionService.createOne(newInput, user.id)

    const updatedInput = {...newInput, type: 'EXPENSE'}
    const updatedTransaction = await transactionService.updateOne(updatedInput, transaction.id, user.id)
    const foundAccount = await accountRepo.getOneAccount(account.id, user.id)

    expect(updatedTransaction.isCashIn).toBe(false)
    expect(updatedTransaction.isCashOut).toBe(true)
    expect(foundAccount?.balance).toBe(-100)
  })

  it ('Updates account when income changes to expense', async () => {
    const { account, input } = await setupTransaction()
    const newInput = {...input, amount: 100, type: 'EXPENSE'}
    const transaction = await transactionService.createOne(newInput, user.id)

    const updatedInput = {...newInput, type: 'INCOME'}
    const updatedTransaction = await transactionService.updateOne(updatedInput, transaction.id, user.id)
    const foundAccount = await accountRepo.getOneAccount(account.id, user.id)

    expect(updatedTransaction.isCashIn).toBe(true)
    expect(updatedTransaction.isCashOut).toBe(false)
    expect(foundAccount?.balance).toBe(100)
  })
})
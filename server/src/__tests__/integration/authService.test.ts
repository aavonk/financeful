import { PrismaClient } from '@prisma/client'
import { resetDatabase, setupEnv } from '../helpers'
import { UserRepo } from '@Modules/Users/repos/implementations/userRepo'
import { AuthService} from '@Modules/Auth/services/implementations/authService'
import { UserInputError } from 'apollo-server-express'
//TODO: Delete authUtils & authRepo

let prisma: PrismaClient
let userRepo: UserRepo
let authService: AuthService

beforeAll(() => {
  setupEnv()
  prisma = new PrismaClient()
  userRepo = new UserRepo(prisma)
  authService = new AuthService(userRepo)
})

afterEach(async () => {
  await resetDatabase(prisma)
})

describe('Registering',  () => {
  it ('Creates a user and returns token', async () => {
    const payload = await authService.handleRegister({
      displayName: 'Aaron vk',
      email: 'test@test.com',
      password: 'testtest',
      passwordConfirmation: 'testtest'
    })

    expect(payload).toHaveProperty('token')
    expect(payload.password).not.toBe('testtest')
  })

  it ('Throws an error when passwords arent the same', async () => {
    const input = {
      displayName: 'Bob Bobby',
      email: 'Bob@bob.com',
      password: 'password',
      passwordConfirmation: 'passsworD'
    }

    await expect(authService.handleRegister(input)).rejects.toBeInstanceOf(UserInputError)
  })

  it ('Throws an error when email isn\'t valid', async () => {
    const input = {
      displayName: 'Bob Bobby',
      email: 'Bob-bob.com',
      password: 'password',
      passwordConfirmation: 'passsword'
    }

    await expect(authService.handleRegister(input)).rejects.toBeInstanceOf(UserInputError)
  })

  it ('Throws an error if the email is taken', async () => {
    const input = {
      displayName: 'Bob Bobby',
      email: 'Bob@bob.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
    //Create the first user
    await authService.handleRegister(input)

    //Create the second
    await expect(authService.handleRegister(input)).rejects.toEqual(new UserInputError('There is already an account associated with this email address'))
  })
})

describe('Logging in', () => {
  it('Returns the user and token when login successful', async () => {
    await authService.handleRegister({
      displayName: 'Bob Bobby',
      email: 'bob@bob.com',
      password: 'password',
      passwordConfirmation: 'password'
    })

    const login = await authService.handleLogin('bob@bob.com', 'password')

    expect(login).toHaveProperty('token')
    expect(login.password).not.toBe('password')
  })

  it ('Throws an error with invalid credentials', async () => {
    await authService.handleRegister({
      displayName: 'Bob Bobby',
      email: 'bob@bob.com',
      password: 'password',
      passwordConfirmation: 'password'
    })

    await expect(authService.handleLogin('bob@bobiscool.com', 'password')).rejects.toEqual(new UserInputError('Invalid Credentials'))
    await expect(authService.handleLogin('bob@bob.com', 'password123')).rejects.toEqual(new UserInputError('Invalid Credentials'))
    
  })
})
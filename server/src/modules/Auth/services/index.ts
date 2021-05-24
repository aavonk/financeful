import prisma from '@Shared/database/prisma'
import { UserRepo } from '@Modules/Users/repos/implementations/userRepo'
import { AuthService } from './implementations/authService'

const userRepo = new UserRepo(prisma)
const authService = new AuthService(userRepo)

export { authService }
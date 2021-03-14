import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types/User';

export const hashpashword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXP,
  });
};

export const validatePassword = async (
  passwordGiven: string,
  passwordToCompare: string,
) => {
  const match = await bcrypt.compare(passwordGiven, passwordToCompare);
  return match;
};

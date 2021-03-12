import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';

export const generateToken = async (user) => {
  return jwt.sign({ id: user.id || user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

export const validatePassword = async (passwordGiven, passwordToCompare) => {
  const match = await bcrypt.compare(passwordGiven, passwordToCompare);
  return match;
};

export const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 12);

  return hashed;
};

export const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid / expired token');
      }
    }
    throw new Error('Authentication token must be Bearer [token] ');
  }
  throw new Error('Authorization header must be provided');
};

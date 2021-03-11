import { UserInputError } from 'apollo-server-express';
import {
  validateRegisterFields,
  validateLoginInput,
} from '../../util/validators';

export const usersResolver = {
  Mutation: {
    async login(_, { email, password }, { dataSources: { authAPI } }) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError('Invalid Errors', { errors });
      }
      return authAPI.requestLogin({ email, password }, errors);
    },
    async register(
      _,
      { registerInput: { password, passwordConfirmation, displayName, email } },
      { dataSources: { authAPI } },
    ) {
      const { errors, valid } = validateRegisterFields(
        displayName,
        email,
        password,
        passwordConfirmation,
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      return authAPI.requestRegister({ email, displayName, password });
    },
  },
};

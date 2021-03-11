import { DataSource } from 'apollo-datasource';
import { UserInputError } from 'apollo-server-express';

export default class AuthAPI extends DataSource {
  constructor({ userModel, validatePassword, generateToken, hashPassword }) {
    super();
    this.userModel = userModel;
    this.validatePassword = validatePassword;
    this.generateToken = generateToken;
    this.hashPassword = hashPassword;
  }

  initialize(config) {
    this.context = config.context;
  }

  parseName(input) {
    const fullName = input || '';
    const firstName = fullName.split(' ')[0];
    return firstName;
  }

  async requestLogin({ email, password }, errors) {
    const user = await this.userModel.findOne({ email }).lean().exec();
    if (!user) {
      errors.general = 'User not found';
      throw new UserInputError('User not found', { errors });
    }

    const match = await this.validatePassword(password, user.password);

    if (!match) {
      errors.general = 'Invalid credentials';
      throw new UserInputError('Invalid credentials', { errors });
    }

    const token = this.generateToken(user);
    return {
      ...user,
      id: user._id,
      token,
    };
  }

  async requestRegister({ email, displayName, password }) {
    const user = await this.userModel.findOne({ email }).lean().exec();

    if (user) {
      throw new UserInputError('There is already an account with this email', {
        errors: {
          email: 'This email has an account',
        },
      });
    }

    const hashedPassword = await this.hashPassword(password);
    const firstName = this.parseName(displayName);

    const newUser = await this.userModel.create({
      email,
      displayName,
      firstName,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser);

    return {
      ...newUser._doc,
      id: newUser._id,
      token,
    };
  }
}

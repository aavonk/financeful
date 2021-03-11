//@ts-check

import { DataSource } from 'apollo-datasource';

export default class UsersAPI extends DataSource {
  constructor({ user, generateToken }) {
    super();
    this.user = user;
    this.generateToken = generateToken;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findByEmail(email) {
    const _user = await this.user.findOne(email);
    return _user;
  }
}

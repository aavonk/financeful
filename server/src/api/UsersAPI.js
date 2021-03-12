import { DataSource } from 'apollo-datasource';
import { AuthenticationError } from 'apollo-server-express';

export default class UsersAPI extends DataSource {
  constructor({ userModel, checkAuth }) {
    super();
    this.user = userModel;
    this.checkAuth = checkAuth;
  }

  initialize(config) {
    this.context = config.context;
  }

  async fetchCurrentUser() {
    const user = this.checkAuth(this.context);

    if (!user) {
      throw new AuthenticationError('Not authorized');
    }

    const currentUser = await this.user.findById(user.id);
    if (!currentUser) {
      throw new Error('User not found by ID');
    }
    return currentUser;
  }
}

import { DataSource } from 'apollo-datasource';
import { AuthenticationError } from 'apollo-server-express';

// When using the .lean() method on a mongoose query,
// The ID isn't virtualize from "._id" to ".id", so this
// will cause an error with the graphql schema.
// In order to work around this, make a copy using the spread operator and
// change the _id field to id

export default class TransactionsAPI extends DataSource {
  constructor(transactionModel, checkAuth) {
    super();
    this.Transaction = transactionModel;
    this.validate = checkAuth;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getTransactions() {
    const user = this.validate(this.context);
    const transactions = await this.Transaction.find({ user: user.id })
      .lean()
      .exec();

    return transactions.map((trans) => ({ ...trans, id: trans._id }));
  }

  async getTransaction(transactionId) {
    const user = this.validate(this.context);
    const transaction = await this.Transaction.findById(transactionId)
      .lean()
      .exec();

    if (transaction.user.toString() === user.id) {
      return {
        ...transaction,
        id: transaction._id,
      };
    } else {
      throw new AuthenticationError('Not Authorized');
    }
  }

  async createTransaction(transactionInputs) {
    const user = this.validate(this.context);
    const newTransaction = await this.Transaction.create({
      ...transactionInputs,
      user: user.id,
    });

    return newTransaction;
  }

  async deleteTransaction(transactionId) {
    const user = this.validate(this.context);
    const transaction = await this.Transaction.findById(transactionId)
      .lean()
      .exec();

    if (!transaction) {
      throw new Error('No transaction found by that ID');
    }

    if (transaction.user.toString() === user.id) {
      await transaction.delete();

      return {
        message: 'Success',
        id: transactionId,
      };
    } else {
      throw new AuthenticationError('Not authorized to perform this action');
    }
  }

  async updateTransaction(transactionId, updates) {
    const user = this.validate(this.context);

    const transaction = await this.Transaction.findById(transactionId);

    if (!transaction) {
      throw new Error('No transaction found by that ID');
    }

    if (transaction.user.toString() === user.id) {
      const updatedTransaction = await this.Transaction.findByIdAndUpdate(
        transactionId,
        updates,
        { new: true },
      );

      return updatedTransaction;
    } else {
      throw new AuthenticationError('Action not authorized');
    }
  }
}

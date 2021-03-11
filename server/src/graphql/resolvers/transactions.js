export const transactionResolvers = {
  Query: {
    async getTransactions(_, __, { dataSources: { transactionAPI } }) {
      return transactionAPI.getTransactions();
    },
    async getTransaction(_, { transId }, { dataSources: { transactionAPI } }) {
      return transactionAPI.getTransaction(transId);
    },
  },
  Mutation: {
    async createTransaction(
      _,
      { transactionInput: { payee, date, amount, category, type } },
      { dataSources: { transactionAPI } },
    ) {
      return transactionAPI.createTransaction({
        payee,
        date,
        amount,
        category,
        type,
      });
    },

    async deleteTransaction(
      _,
      { transId },
      { dataSources: { transactionAPI } },
    ) {
      return transactionAPI.deleteTransaction(transId);
    },

    async updateTransaction(
      _,
      { transId, updates },
      { dataSources: { transactionAPI } },
    ) {
      return transactionAPI.updateTransaction(transId, updates);
    },
  },
};

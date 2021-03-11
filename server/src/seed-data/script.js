import Transaction from '../models/Transactions';
import transactionData from './data/transactions';

export const seedData = async () => {
  console.log(
    `🌿🍃 Inserting Seed Data: ${transactionData.length} Transactions`,
  );
  try {
    for (const transaction of transactionData) {
      console.log(`🚀 Adding Transaction: ${transaction.payee}`);
      await Transaction.create(transaction);
    }
  } catch (error) {
    console.log(`🚨 Error uploading: ${error.message}`);
  }

  console.log(
    `✅✅✅ Successfully added ${transactionData.lenth} Transactions`,
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
};

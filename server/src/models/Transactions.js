import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    payee: {
      type: String,
      required: true,
      trim: true,
    },
    amount: Number,
    category: String,
    date: {
      type: Date,
      default: Date.now(),
    },
    type: {
      type: String,
      enum: ['income', 'expense', 'transfer'],
      default: 'expense',
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Transaction = model('Transaction', TransactionSchema);

export default Transaction;

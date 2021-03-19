export const formatTransactionType = (type: string) => {
  // console.log(type);
  const expense = 'EXPENSE';
  const income = 'INCOME';
  if (type === expense || type === income) {
    return type.charAt(0) + type.slice(1).toLowerCase();
  }
};

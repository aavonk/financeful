import {
  useAddTransactionMutation,
  GetTransactionsRangeDocument,
  GetUncategorizedLengthDocument,
  GetUncategorizedTransactionsDocument,
} from '@Generated/graphql';

export function useCreateTransaction() {
  const [mutate, { data, error, loading }] = useAddTransactionMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactionsRange: (existingFieldData = []) => {
            const newTransactionRef = cache.writeQuery({
              data: data?.createTransaction,
              query: GetTransactionsRangeDocument,
            });
            return [newTransactionRef, ...existingFieldData];
          },
          getUncategorizedLength: () => {
            //@ts-ignore
            const { getUncategorizedLength } = cache.readQuery({
              query: GetUncategorizedLengthDocument,
            });
            const isUnCategorized = data?.createTransaction.category === null;

            if (!isUnCategorized) return;

            cache.writeQuery({
              data: getUncategorizedLength + 1,
              query: GetUncategorizedLengthDocument,
            });
          },
          getUncategorizedTransactions: () => {
            const isUnCategorized = data?.createTransaction.category === null;

            if (!isUnCategorized) return;

            cache.writeQuery({
              data: data?.createTransaction,
              query: GetUncategorizedTransactionsDocument,
            });
          },
        },
      });
    },
  });

  return { mutate, data, error, loading };
}

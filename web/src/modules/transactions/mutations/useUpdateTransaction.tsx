import {
  useUpdateTransactionMutation,
  GetTransactionsDocument,
} from '@Generated/graphql';

export function useUpdateTransaction() {
  const [mutate, { data, loading, error }] = useUpdateTransactionMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactions: (existingFieldData = []) => {
            const newTransactionRef = cache.writeQuery({
              data: data?.updateTransaction,
              query: GetTransactionsDocument,
            });
            return [newTransactionRef, ...existingFieldData];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

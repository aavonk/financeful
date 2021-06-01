import {
  useUpdateTransactionMutation,
  GetTransactionsRangeDocument,
} from '@Generated/graphql';

export function useUpdateTransaction() {
  const [mutate, { data, loading, error }] = useUpdateTransactionMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactionsRange: (existingFieldData = []) => {
            const newTransactionRef = cache.writeQuery({
              data: data?.updateTransaction,
              query: GetTransactionsRangeDocument,
            });
            return [newTransactionRef, ...existingFieldData];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

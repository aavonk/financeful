import {
  useAddTransactionMutation,
  GetTransactionsRangeDocument,
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
        },
      });
    },
  });

  return { mutate, data, error, loading };
}

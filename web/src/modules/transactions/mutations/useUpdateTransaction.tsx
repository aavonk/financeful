import {
  useUpdateTransactionMutation,
  GetTransactionsRangeDocument,
  GetUncategorizedLengthDocument,
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
          getUncategorizedLength: () => {
            //@ts-ignore
            const { getUncategorizedLength } = cache.readQuery({
              query: GetUncategorizedLengthDocument,
            });
            const isUnCategorized = data?.updateTransaction.category === null;

            if (!isUnCategorized) return;

            cache.writeQuery({
              data: getUncategorizedLength + 1,
              query: GetUncategorizedLengthDocument,
            });
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

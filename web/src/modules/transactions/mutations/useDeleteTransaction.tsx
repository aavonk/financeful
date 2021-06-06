import {
  useDeleteTransactionMutation,
  Transaction,
  GetUncategorizedLengthDocument,
} from '@Generated/graphql';

export function useDeleteTransaction(transactionId: string) {
  const [mutate, { data, error, loading }] = useDeleteTransactionMutation({
    update(cache) {
      cache.modify({
        fields: {
          getTransactionsRange(ref: Transaction[], { readField }) {
            return ref.filter(
              (transactionRef) => transactionId !== readField('id', transactionRef),
            );
          },
        },
      });
    },
    refetchQueries: [
      {
        query: GetUncategorizedLengthDocument,
      },
    ],
  });

  return { mutate, data, error, loading };
}

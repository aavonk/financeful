import {
  useDeleteTransferMutation,
  Transaction,
  GetUncategorizedLengthDocument,
} from '@Generated/graphql';

export function useDeleteTransfer(transferId: string) {
  const [mutate, { data, error, loading }] = useDeleteTransferMutation({
    update(cache) {
      cache.modify({
        fields: {
          getTransactionsRange(ref: Transaction[], { readField }) {
            return ref.filter(
              (transactionsRef) =>
                transferId !== readField('transferId', transactionsRef),
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

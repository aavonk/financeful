import { useCreateTransferMutation, GetTransactionsDocument } from '@Generated/graphql';

export function useCreateTransfer() {
  const [mutate, { data, loading, error }] = useCreateTransferMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactions: (existingFieldData = []) => {
            const newTransactionsRef = cache.writeQuery({
              data: data?.createTransfer,
              query: GetTransactionsDocument,
            });

            return [newTransactionsRef, ...existingFieldData];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

import {
  useCreateTransferMutation,
  GetTransactionsRangeDocument,
} from '@Generated/graphql';

export function useCreateTransfer() {
  const [mutate, { data, loading, error }] = useCreateTransferMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactionsRange: (existingFieldData = []) => {
            const newTransactionsRef = cache.writeQuery({
              data: data?.createTransfer,
              query: GetTransactionsRangeDocument,
            });

            return [newTransactionsRef, ...existingFieldData];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

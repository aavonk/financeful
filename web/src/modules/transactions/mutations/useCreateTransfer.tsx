import {
  useCreateTransferMutation,
  GetTransactionsRangeDocument,
  GetUncategorizedLengthDocument,
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
          getUncategorizedLength: () => {
            //@ts-ignore
            const { getUncategorizedLength } = cache.readQuery({
              query: GetUncategorizedLengthDocument,
            });
            const isUnCategorized =
              data?.createTransfer.transactions &&
              data?.createTransfer.transactions[0].category === null;

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

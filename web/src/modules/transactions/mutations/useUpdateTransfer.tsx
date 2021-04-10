import { useUpdateTransferMutation } from '@Generated/graphql';

export function useUpdateTransfer() {
  const [mutate, { data, loading, error }] = useUpdateTransferMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getTransactions(existingTransactionsRef = [], { readField }){
            const filteredTransactions = existingTransactionsRef.filter((transactionRef) => )
          }
        }
      })
    }
  });

  return { mutate, data, loading, error };
}

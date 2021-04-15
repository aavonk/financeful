import { useCreateAccountMutation, GetAccountsDocument } from '@Generated/graphql';

export function useCreateAccount() {
  const [mutate, { data, error, loading }] = useCreateAccountMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getAccounts: (existingAcocunts = []) => {
            const newAccountRef = cache.writeQuery({
              data: data?.createAccount,
              query: GetAccountsDocument,
            });

            return [...existingAcocunts, newAccountRef];
          },
        },
      });
    },
  });

  return { mutate, data, error, loading };
}

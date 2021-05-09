import {
  useCreateAccountMutation,
  GetAccountsDocument,
  GetAssetsAndLiabilitiesDocument,
} from '@Generated/graphql';

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
    refetchQueries: [
      {
        query: GetAssetsAndLiabilitiesDocument,
      },
    ],
  });

  return { mutate, data, error, loading };
}

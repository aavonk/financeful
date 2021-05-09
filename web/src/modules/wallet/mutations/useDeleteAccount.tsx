import {
  useDeleteAccountMutation,
  GetAssetsAndLiabilitiesDocument,
} from '@Generated/graphql';

export function useDeleteAccount() {
  const [deleteAccount] = useDeleteAccountMutation({
    refetchQueries: [
      {
        query: GetAssetsAndLiabilitiesDocument,
      },
    ],
  });

  return [deleteAccount];
}

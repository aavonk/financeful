import { useCreateCategoryMutation, FetchCategoriesDocument } from '@Generated/graphql';

export function useCreateCategory() {
  const [mutate, { data, loading, error }] = useCreateCategoryMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          getCategories: (existingData = []) => {
            if (data?.createCategory.error) return;

            const ref = cache.writeQuery({
              data: data?.createCategory.category,
              query: FetchCategoriesDocument,
            });

            return [ref, ...existingData];
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

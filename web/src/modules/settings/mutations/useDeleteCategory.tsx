import { useDeleteCategoryMutation, Category } from '@Generated/graphql';

export function useDeleteCategory(categoryId: string) {
  const [mutate, { data, loading, error }] = useDeleteCategoryMutation({
    update(cache) {
      cache.modify({
        fields: {
          getCategories(ref: Category[], { readField }) {
            return ref.filter(
              (categoryRef) => categoryId !== readField('id', categoryRef),
            );
          },
        },
      });
    },
  });

  return { mutate, data, loading, error };
}

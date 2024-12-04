import { updateLikedProducts } from "@/libs/appwrite/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateLikedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      docId,
      likedProductIds,
    }: {
      docId: string;
      likedProductIds: string[];
    }) => updateLikedProducts(docId, likedProductIds),
    onMutate: async ({ docId, likedProductIds }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["product.liked"] });

      // Snapshot the previous value
      const previousLikedProducts = queryClient.getQueryData(["product.liked"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["product.liked"], (old: any) => ({
        ...old,
        id: docId,
        products: likedProductIds.map((id) => ({ id })),
      }));

      // Return a context object with the snapshotted value
      return { previousLikedProducts };
    },
    onError: (err, newLikedProducts, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ["product.liked"],
        context?.previousLikedProducts
      );
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the correct data
      queryClient.invalidateQueries({ queryKey: ["product.liked"] });
    },
  });
};

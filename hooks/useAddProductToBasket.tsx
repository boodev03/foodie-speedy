import { CartItem, ShoppingSession } from "@/constants/shopping.type";
import { addProductToBasket } from "@/libs/appwrite/appwrite";
import { AddToBasketPayload } from "@/libs/appwrite/payload.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddProductToBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      payload,
      currentShoppingSession,
    }: {
      email: string;
      payload: AddToBasketPayload;
      currentShoppingSession: ShoppingSession | undefined;
    }) => addProductToBasket(email, payload, currentShoppingSession),
    onMutate: async ({ email, payload }) => {
      const queryKey = ["shopping.sesison", email];
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousLikedProducts = queryClient.getQueryData(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData(
        queryKey,
        (old: ShoppingSession[]): ShoppingSession[] => {
          const newCartItem: CartItem = {
            id: "",
            price: payload.price,
            product_id: payload.product_id,
            quantity: payload.quantity,
            session_id: "",
            toppings: payload.toppings,
            toppings_price: payload.toppings_price,
          };
          if (old.length === 0) {
            return [
              {
                id: "",
                user_email: email,
                total:
                  payload.price * payload.quantity +
                  payload.toppings_price.reduce((a, b) => a + b, 0),
                cartItems: [newCartItem],
              },
            ];
          }
          return [
            {
              ...old[0],
              total:
                old[0].total +
                payload.price * payload.quantity +
                payload.toppings_price.reduce((a, b) => a + b, 0),
              cartItems: [...old[0].cartItems, newCartItem],
            },
          ];
        }
      );

      // Return a context object with the snapshotted value
      return { previousLikedProducts };
    },
    onError: (_, newLikedProducts, context) => {
      const queryKey = ["shopping.sesison", newLikedProducts.email];
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(queryKey, context?.previousLikedProducts);
    },
    onSettled: (_, __, { email }) => {
      // Always refetch after error or success to ensure we have the correct data
      const queryKey = ["shopping.sesison", email];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

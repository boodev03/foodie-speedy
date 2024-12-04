import { getShoppingCart } from "@/libs/appwrite/appwrite";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "../ui/Button";
import BasketCheckoutSummary from "./BasketCheckoutSummary";
import BasketProduct from "./BasketProduct";

interface IProps {
  productQuantities: { [id: string]: number };
  handleIncreaseQuantity: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
}

const BasketProductList = ({
  productQuantities,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: IProps) => {
  const { user } = useUser();
  const { data: shoppingSession } = useQuery({
    queryKey: ["shopping.sesison", user?.emailAddresses[0].emailAddress],
    queryFn: () =>
      getShoppingCart(user?.emailAddresses[0].emailAddress as string),
  });
  console.log(shoppingSession);
  return (
    <View className="space-y-5 pb-[100px]">
      <View className="flex-row justify-between items-center">
        <Text>Order Summary</Text>
        <Button title="Add Items" variant="outline" className="w-auto" />
      </View>

      {/* Product List */}
      <View className="grow">
        {shoppingSession &&
          shoppingSession?.length > 0 &&
          shoppingSession?.[0]?.cartItems.map((cartItem) => (
            <BasketProduct
              cartItem={cartItem}
              productQuantities={productQuantities}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
            />
          ))}
      </View>

      {/* Delivery */}
      {/* <View>
        <BasketSection
          title="Deliver to"
          icon={<LocationFillIcon />}
          content="Ho Chi Minh City"
          href="(modal)/location-search"
          defaultContent="Select Your Location"
        />
      </View> */}

      {/* Payment Method */}
      {/* <View>
        <BasketSection
          title="Payment method"
          icon={<PaymentMethodFillIcon />}
          content=""
          href="(modal)/location-search"
          defaultContent="Select Payment Method"
        />
      </View> */}

      {/* Promotions */}
      {/* <View>
        <BasketSection
          title="Promotions"
          icon={<PromotionFillIcon />}
          content=""
          href="(modal)/location-search"
          defaultContent="Select Your Promotions"
        />
      </View> */}

      {/* Checkout Summary */}
      {shoppingSession && (
        <View className="px-[2px]">
          <BasketCheckoutSummary
            cartItems={shoppingSession?.[0].cartItems || []}
            productQuantities={productQuantities}
          />
        </View>
      )}
    </View>
  );
};

export default BasketProductList;

import React from "react";
import { View } from "react-native";
import FSText from "../FSText";
import { formatToUSD } from "@/utils/formatCurrency";
import { CartItem } from "@/constants/shopping.type";

interface IProps {
  cartItems: CartItem[];
  productQuantities: { [id: string]: number };
}

const BasketCheckoutSummary = ({ cartItems, productQuantities }: IProps) => {
  return (
    <View className="space-y-[14px]">
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Subtotal
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(
            cartItems.reduce((acc, item) => {
              const toppingPrices = item.toppings_price
                ? item.toppings_price.reduce(
                    (toppingAcc, topping) => toppingAcc + topping,
                    0
                  )
                : 0;
              return (
                acc +
                item.price * (productQuantities[item.id] || item.quantity) +
                toppingPrices
              );
            }, 0)
          )}
        </FSText>
      </View>
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Delivery Fee
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(0)}
        </FSText>
      </View>
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Discount
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(0)}
        </FSText>
      </View>
      <View className="h-[1px] bg-black" />
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Total
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(
            cartItems.reduce((acc, item) => {
              const toppingPrices = item.toppings_price
                ? item.toppings_price.reduce(
                    (toppingAcc, topping) => toppingAcc + topping,
                    0
                  )
                : 0;
              return acc + item.price * item.quantity + toppingPrices;
            }, 0)
          )}
        </FSText>
      </View>
    </View>
  );
};

export default BasketCheckoutSummary;

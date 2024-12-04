import React from "react";
import { View } from "react-native";
import FSText from "../FSText";
import { formatToUSD } from "@/utils/formatCurrency";

const BasketCheckoutSummary = () => {
  return (
    <View className="space-y-[14px]">
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Subtotal
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(20.5)}
        </FSText>
      </View>
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Delivery Fee
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(20.5)}
        </FSText>
      </View>
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Discount
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(20.5)}
        </FSText>
      </View>
      <View className="h-[1px] bg-black" />
      <View className="flex-row justify-between items-center">
        <FSText className="text-neutral-900" weight="400">
          Total
        </FSText>
        <FSText className="text-neutral-900" weight="600">
          {formatToUSD(20.5)}
        </FSText>
      </View>
    </View>
  );
};

export default BasketCheckoutSummary;

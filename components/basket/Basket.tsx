import { formatToUSD } from "@/utils/formatCurrency";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FSText from "../FSText";
import { Button } from "../ui/Button";
import { ScreenHeader } from "../ui/ScreenHeader";
import BasketProductList from "./BasketProductList";

const Basket = () => {
  return (
    <SafeAreaView className="mt-5 flex-1 space-y-6">
      <View className="px-3">
        <ScreenHeader title="My Basket" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="grow"
        contentContainerStyle={{
          paddingHorizontal: 12,
          flexGrow: 1,
        }}
      >
        <View>
          <BasketProductList />
        </View>
      </ScrollView>

      <View
        style={{
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          shadowColor: "rgba(13, 10, 44, 0.20)",
          elevation: 20,
        }}
        className="flex-row justify-between items-center absolute bottom-4 left-0 right-0 bg-white rounded-[12px] h-[77px] pl-4 pr-2 mx-3"
      >
        <FSText variant="heading2" className="text-neutral-900" weight="600">
          {formatToUSD(20.5)}
        </FSText>
        <Button activeOpacity={0.9} size="lg" title="Place Order" />
      </View>
    </SafeAreaView>
  );
};

export default Basket;

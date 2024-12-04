import LocationFillIcon from "@/assets/icons/LocationFillIcon";
import PaymentMethodFillIcon from "@/assets/icons/PaymentMethodFillIcon";
import PromotionFillIcon from "@/assets/icons/PromotionFillIcon";
import { formatToUSD } from "@/utils/formatCurrency";
import React from "react";
import { Text, View } from "react-native";
import FSText from "../FSText";
import { Button } from "../ui/Button";
import BasketCheckoutSummary from "./BasketCheckoutSummary";
import BasketProduct from "./BasketProduct";
import BasketSection from "./BasketSection";

const BasketProductList = () => {
  return (
    <View className="space-y-5 pb-[100px]">
      <View className="flex-row justify-between items-center">
        <Text>Order Summary</Text>
        <Button title="Add Items" variant="outline" className="w-auto" />
      </View>

      {/* Product List */}
      <View>
        <BasketProduct />
      </View>

      {/* Delivery */}
      <View>
        <BasketSection
          title="Deliver to"
          icon={<LocationFillIcon />}
          content="Ho Chi Minh City"
          href="(modal)/location-search"
          defaultContent="Select Your Location"
        />
      </View>

      {/* Payment Method */}
      <View>
        <BasketSection
          title="Payment method"
          icon={<PaymentMethodFillIcon />}
          content=""
          href="(modal)/location-search"
          defaultContent="Select Payment Method"
        />
      </View>

      {/* Promotions */}
      <View>
        <BasketSection
          title="Promotions"
          icon={<PromotionFillIcon />}
          content=""
          href="(modal)/location-search"
          defaultContent="Select Your Promotions"
        />
      </View>

      {/* Checkout Summary */}
      <View className="px-[2px]">
        <BasketCheckoutSummary />
      </View>
    </View>
  );
};

export default BasketProductList;

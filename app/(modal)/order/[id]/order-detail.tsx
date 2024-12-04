import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/libs/appwrite/appwrite";
import FSText from "@/components/FSText";
import { formatToUSD } from "@/utils/formatCurrency";
import { Ionicons } from "@expo/vector-icons";

const OrderDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id as string),
  });

  if (!order) return null;

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <View className="px-4 pt-5">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          {/* <ScreenHeader title="Order Details" /> */}
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        {/* Order Info */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <FSText variant="body" className="text-neutral-500">
              Order ID
            </FSText>
            <FSText variant="body" weight="600">
              #{order.id}
            </FSText>
          </View>
          <View className="flex-row justify-between items-center">
            <FSText variant="body" className="text-neutral-500">
              Status
            </FSText>
            <View
              className={`px-2.5 py-1 rounded-lg ${
                order.payment.payment_method_status === "paid"
                  ? "bg-green-100"
                  : "bg-orange-100"
              }`}
            >
              <FSText
                variant="caption"
                weight="600"
                className={
                  order.payment.payment_method_status === "paid"
                    ? "text-green-700"
                    : "text-orange-700"
                }
              >
                {order.payment.payment_method_status === "paid"
                  ? "Paid"
                  : "Pending"}
              </FSText>
            </View>
          </View>
        </View>

        {/* Order Items */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <FSText variant="body" weight="600" className="mb-4">
            Order Items
          </FSText>
          {order.order_details.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between py-3 border-b border-neutral-100 last:border-b-0"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-[60px] h-[60px] rounded-lg bg-neutral-100 mr-3">
                  {item.product_image && (
                    <Image
                      source={{ uri: item.product_image }}
                      className="w-full h-full rounded-lg"
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View className="flex-1">
                  <FSText variant="body" weight="600" className="mb-1">
                    {item.product_name}
                  </FSText>
                  <FSText variant="caption" className="text-neutral-500">
                    Quantity: {item.quantity}
                  </FSText>
                </View>
              </View>
              <FSText variant="body" weight="600">
                {formatToUSD(item.price * item.quantity)}
              </FSText>
            </View>
          ))}
        </View>

        {/* Price Summary */}
        <View className="bg-white rounded-xl p-4">
          <FSText variant="body" weight="600" className="mb-4">
            Price Details
          </FSText>
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <FSText variant="body" className="text-neutral-500">
                Subtotal
              </FSText>
              <FSText variant="body" weight="600">
                {formatToUSD(order.sub_total)}
              </FSText>
            </View>
            <View className="flex-row justify-between">
              <FSText variant="body" className="text-neutral-500">
                Discount
              </FSText>
              <FSText variant="body" weight="600" className="text-green-600">
                - {formatToUSD(order.discounted)}
              </FSText>
            </View>
            <View className="pt-3 border-t border-neutral-100">
              <View className="flex-row justify-between">
                <FSText variant="body" weight="600">
                  Total Amount
                </FSText>
                <FSText
                  variant="heading2"
                  weight="600"
                  className="text-primary"
                >
                  {formatToUSD(order.sub_total - order.discounted)}
                </FSText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

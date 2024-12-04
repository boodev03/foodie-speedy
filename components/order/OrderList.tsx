import { Order } from "@/constants/order.type";
import { formatToUSD } from "@/utils/formatCurrency";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, View } from "react-native";
import FSText from "../FSText";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <View className="space-y-3">
      {orders.map((order) => (
        <Pressable
          key={order.id}
          className="bg-white rounded-xl p-4 border border-neutral-100"
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={() =>
            router.push(`(modal)/order/${order.id}/order-detail` as any)
          }
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <FSText variant="caption" className="text-neutral-500 mb-0.5">
                Order ID
              </FSText>
              <FSText variant="body" weight="600" className="text-neutral-800">
                #{order.id.slice(0, 8)}
              </FSText>
            </View>
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

          {/* Products */}
          <View className="mb-3">
            <FSText variant="caption" className="text-neutral-500 mb-2">
              Products
            </FSText>
            <View className="flex-row gap-2">
              {order.order_details.slice(0, 3).map((item, index) => (
                <View
                  key={`${order.id}-${index}`}
                  className="w-[70px] h-[70px] rounded-lg overflow-hidden bg-neutral-50"
                >
                  <Image
                    source={{ uri: item.product_image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
              {order.order_details.length > 3 && (
                <View className="w-[70px] h-[70px] rounded-lg bg-neutral-100 items-center justify-center">
                  <FSText
                    variant="body"
                    weight="600"
                    className="text-neutral-700"
                  >
                    +{order.order_details.length - 3}
                  </FSText>
                </View>
              )}
            </View>
          </View>

          {/* Price */}
          <View className="flex-row justify-between items-center pt-3 border-t border-neutral-100">
            <FSText variant="caption" className="text-neutral-500">
              Total Amount
            </FSText>
            <FSText
              variant="heading2"
              className="text-primary-600"
              weight="600"
            >
              {formatToUSD(order.sub_total - order.discounted)}
            </FSText>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default OrderList;

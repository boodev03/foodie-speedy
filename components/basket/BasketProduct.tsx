import CloseIcon from "@/assets/icons/CloseIcon";
import MinusIconSmall from "@/assets/icons/MinusIconSmall";
import PlusIconSmall from "@/assets/icons/PlusIconSmall";
import { CartItem } from "@/constants/shopping.type";
import { formatToUSD } from "@/utils/formatCurrency";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FSText from "../FSText";

interface IProps {
  cartItem: CartItem;
  productQuantities: { [id: string]: number };
  handleIncreaseQuantity: (id: string) => void;
  handleDecreaseQuantity: (id: string) => void;
}

const BasketProduct = ({
  cartItem,
  productQuantities,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: IProps) => {
  return (
    <View
      className="bg-white p-2 rounded-[12px] space-y-3"
      style={{
        shadowColor: "rgba(13, 10, 44, 0.10)",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
      }}
    >
      <View className="flex-row gap-x-3 items-center">
        <Image
          className="w-[75px] h-[75px] rounded-[8px]"
          src={cartItem.product_image}
        />
        <View className="flex-1 space-y-2">
          <View className="flex-row items-center justify-between">
            <FSText variant="caption" weight="500">
              {cartItem.product_name}
            </FSText>

            <TouchableOpacity activeOpacity={0.9}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-x-2">
            {cartItem.price_original && (
              <FSText
                variant="body"
                weight="400"
                className="text-neutral-200 line-through"
              >
                {formatToUSD(
                  cartItem.price_original *
                    (productQuantities[cartItem.id] || cartItem.quantity)
                )}
              </FSText>
            )}
            <FSText variant="body" weight="600" className="text-primary-500">
              {formatToUSD(
                cartItem.price *
                  (productQuantities[cartItem.id] || cartItem.quantity)
              )}
            </FSText>
          </View>

          <View className="flex-row space-x-3 items-center">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleDecreaseQuantity(cartItem.id)}
              className="w-[26px] h-[26px] rounded-full flex justify-center items-center"
              style={{
                borderWidth: 1,
                borderColor: "#e9eaeb",
              }}
            >
              <MinusIconSmall />
            </TouchableOpacity>
            <Text className="text-[22px] leading-[26px] font-[Roboto] text-neutral-900">
              {productQuantities[cartItem.id]}
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleIncreaseQuantity(cartItem.id)}
              className="w-[26px] h-[26px] rounded-full flex justify-center items-center"
              style={{
                borderWidth: 1,
                borderColor: "#e9eaeb",
              }}
            >
              <PlusIconSmall />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[1px] bg-neutral-50" />
      {cartItem.toppings.map((item, index) => (
        <View className="flex-row items-center justify-between" key={index}>
          <FSText className="text-neutral-900" variant="caption" weight="400">
            {item.split("-")[0]}
          </FSText>
          <FSText className="text-primary-500" variant="caption" weight="500">
            {formatToUSD(
              cartItem.toppings_price[index] *
                (productQuantities[cartItem.id] || cartItem.quantity)
            )}
          </FSText>
        </View>
      ))}
    </View>
  );
};

export default BasketProduct;

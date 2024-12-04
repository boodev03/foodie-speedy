import CloseIcon from "@/assets/icons/CloseIcon";
import MinusIconSmall from "@/assets/icons/MinusIconSmall";
import PenIcon from "@/assets/icons/PenIcon";
import PlusIconSmall from "@/assets/icons/PlusIconSmall";
import { formatToUSD } from "@/utils/formatCurrency";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FSText from "../FSText";

const BasketProduct = () => {
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
          src="https://cloud.appwrite.io/v1/storage/buckets/66d47efe003d14a7ea12/files/66fe59ae0030029065cb/view?project=66d47a4f002feac4bd55&project=66d47a4f002feac4bd55&mode=admin"
        />
        <View className="flex-1 space-y-2">
          <View className="flex-row items-center justify-between">
            <FSText variant="caption" weight="500">
              Chicken Burger
            </FSText>

            <TouchableOpacity activeOpacity={0.9}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-x-2">
            <FSText
              variant="body"
              weight="400"
              className="text-neutral-200 line-through"
            >
              {formatToUSD(10)}
            </FSText>
            <FSText variant="body" weight="600" className="text-primary-500">
              {formatToUSD(6)}
            </FSText>
          </View>

          <View className="flex-row space-x-3 items-center">
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => setQuantity((pre) => (pre === 1 ? 1 : pre - 1))}
              className="w-[26px] h-[26px] rounded-full flex justify-center items-center"
              style={{
                borderWidth: 1,
                borderColor: "#e9eaeb",
              }}
            >
              <MinusIconSmall />
            </TouchableOpacity>
            <Text className="text-[22px] leading-[26px] font-[Roboto] text-neutral-900">
              {/* {quantity} */}1
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => setQuantity(quantity + 1)}
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
      <View className="flex-row items-center justify-between">
        <FSText className="text-neutral-900" variant="caption" weight="400">
          Add Cheese
        </FSText>
        <FSText className="text-primary-500" variant="caption" weight="500">
          {formatToUSD(0.5)}
        </FSText>
      </View>
    </View>
  );
};

export default BasketProduct;

import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { getSpecialOffers } from "@/libs/appwrite/appwrite";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ProductItem from "../ui/ProductItem";

const HomeSpecialOffers = () => {
  const { data } = useQuery({
    queryKey: ["special-offers"],
    queryFn: () => getSpecialOffers(4),
  });

  return (
    <View className="mb-[100px]">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-[16px] leading-[19px] font-[Roboto-Bold] text-neutral-900">
          Special Offers
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/special-offer")}
          activeOpacity={0.8}
          className="flex-row items-center"
        >
          <Text className="text-[16px] leading-[19px] font-[Roboto-Bold] text-primary-500 mr-[2px]">
            View All
          </Text>
          <ArrowRightIcon height={19} />
        </TouchableOpacity>
      </View>
      {/* Product */}
      <FlatList
        nestedScrollEnabled
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem key={item.id} product={item} />}
        numColumns={2}
        columnWrapperStyle={{
          gap: 12,
        }}
        contentContainerStyle={{
          gap: 12,
        }}
      />
    </View>
  );
};

export default HomeSpecialOffers;

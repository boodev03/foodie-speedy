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

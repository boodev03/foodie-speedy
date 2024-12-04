import React from "react";
import { View } from "react-native";

const ProductItemSkeleton = () => {
  return (
    <View
      className="flex-1 bg-white rounded-[10px] space-y-2 p-2"
      style={{
        shadowColor: "rgba(13, 10, 44, 0.06)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      {/* Thumbnail skeleton */}
      <View className="w-full rounded-tl-[10px] rounded-tr-[10px] h-[100px] bg-gray-200 animate-pulse" />

      {/* Name skeleton */}
      <View className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />

      {/* Rating and sales skeleton */}
      <View className="flex-row gap-x-1 items-center">
        <View className="w-[14px] h-[14px] bg-gray-200 rounded animate-pulse" />
        <View className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
        <View className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
      </View>

      {/* Price skeleton */}
      <View className="flex-row gap-x-2 items-center">
        <View className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <View className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </View>

      {/* Like button skeleton */}
      <View className="absolute top-2 right-3 w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
    </View>
  );
};

export default ProductItemSkeleton;

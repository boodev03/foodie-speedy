import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetailSkeleton = () => {
  return (
    <SafeAreaView className="px-3 mt-12">
      <View className="mb-[150px]">
        <View className="mb-5 relative">
          <View className="w-full h-[300px] bg-gray-200 rounded-[12px]" />
          <View className="w-10 h-10 rounded-[22px] bg-gray-300 absolute top-8 left-5" />
          <View className="w-10 h-10 rounded-full bg-gray-300 absolute bottom-4 right-3" />
        </View>

        <View className="space-y-4 px-3">
          <View className="h-7 w-3/4 bg-gray-200 rounded" />
          <View className="flex-row gap-x-2 items-center">
            <View className="h-5 w-20 bg-gray-200 rounded" />
            <View className="h-5 w-20 bg-gray-200 rounded" />
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-x-2 items-center">
              <View className="w-5 h-5 bg-gray-200 rounded-full" />
              <View className="h-5 w-10 bg-gray-200 rounded" />
              <View className="h-5 w-10 bg-gray-200 rounded" />
            </View>
            <View className="h-5 w-24 bg-gray-200 rounded" />
          </View>
          <View className="space-y-2">
            <View className="h-4 w-full bg-gray-200 rounded" />
            <View className="h-4 w-full bg-gray-200 rounded" />
            <View className="h-4 w-3/4 bg-gray-200 rounded" />
          </View>

          <View className="space-y-4">
            <View className="h-6 w-1/2 bg-gray-200 rounded" />
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="flex-row justify-between items-center"
              >
                <View className="h-5 w-1/3 bg-gray-200 rounded" />
                <View className="h-5 w-16 bg-gray-200 rounded" />
                <View className="w-6 h-6 bg-gray-200 rounded" />
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center absolute bottom-4 left-0 right-0 bg-white rounded-[12px] h-[77px] px-4 mx-3">
        <View className="flex-row space-x-3 items-center">
          <View className="w-10 h-10 rounded-full bg-gray-200" />
          <View className="h-6 w-6 bg-gray-200 rounded" />
          <View className="w-10 h-10 rounded-full bg-gray-200" />
        </View>
        <View className="h-12 w-40 bg-gray-200 rounded-full" />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailSkeleton;

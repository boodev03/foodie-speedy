import React from "react";
import { View } from "react-native";

const Skeleton = ({ className }: { className: string }) => {
  return (
    <View className={`animate-pulse bg-neutral-200 rounded-md ${className}`} />
  );
};

const OrderSkeleton = () => {
  return (
    <View className="space-y-4">
      {[1, 2, 3].map((item) => (
        <View key={item} className="bg-white p-4 rounded-xl space-y-3">
          <View className="flex-row justify-between items-center">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </View>

          <View className="flex-row space-x-2">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <Skeleton className="w-20 h-20 rounded-lg" />
            <Skeleton className="w-20 h-20 rounded-lg" />
          </View>

          <View className="flex-row justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <View className="flex-row space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Skeleton key={star} className="w-4 h-4" />
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OrderSkeleton;

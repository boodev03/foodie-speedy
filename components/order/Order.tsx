import { OrderStatus } from "@/constants/order.type";
import { getOrders, getOrdersByStatus } from "@/libs/appwrite/appwrite";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../home/SearchBar";
import OrderSkeleton from "../ui/loading/OrderSkeleton";
import { ScreenHeader } from "../ui/ScreenHeader";
import OrderList from "./OrderList";

const TABS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

const Order = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.emailAddresses[0].emailAddress, activeTab],
    queryFn: () =>
      activeTab === "all"
        ? getOrders(user?.emailAddresses[0].emailAddress as string)
        : getOrdersByStatus(
            user?.emailAddresses[0].emailAddress as string,
            activeTab
          ),
    enabled: !!user?.emailAddresses[0].emailAddress,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (isLoading) {
    return <OrderSkeleton />;
  }

  return (
    <SafeAreaView className="mt-5 flex-1 space-y-6 px-3 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="grow"
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-3">
          <ScreenHeader title="Orders" />
        </View>
        <View className="my-4">
          <SearchBar onChange={() => {}} />
        </View>
        <View className="flex-1">
          <View className="flex-row">
            {TABS.map((tab) => (
              <Pressable
                key={tab.value}
                onPress={() => setActiveTab(tab.value)}
                className={`py-1 px-4 rounded-[8px] mr-2 ${
                  activeTab === tab.value ? "bg-primary-500" : "bg-neutral-50"
                }`}
              >
                <Text
                  className={`${
                    activeTab === tab.value ? "text-white" : "text-neutral-500"
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="flex-1 px-4 pt-4 mb-[100px]">
            <OrderList orders={orders} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllLikedProducts } from "@/libs/appwrite/appwrite";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../ui/ScreenHeader";
import SearchBar from "../home/SearchBar";
import ProductListSkeleton from "../ui/loading/ProductListSkeleton";
import ProductList from "../ui/ProductList";

const Liked = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["product.liked"],
    queryFn: () =>
      getAllLikedProducts(user?.emailAddresses[0].emailAddress as string),
  });
  return (
    <SafeAreaView className="px-3 mt-12 flex-1">
      <ScreenHeader title="Liked" />
      <View className="my-4">
        <SearchBar onChange={() => {}} />
      </View>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <View className="grow-[1] h-[400px]">
          <ProductList isLiked={true} products={data?.products || []} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Liked;

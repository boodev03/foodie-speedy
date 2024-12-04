import { getProductsByCategoryId } from "@/libs/appwrite/appwrite";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "../home/Categories";
import SearchBar from "../home/SearchBar";
import ProductListSkeleton from "../ui/loading/ProductListSkeleton";
import ProductList from "../ui/ProductList";
import { ScreenHeader } from "../ui/ScreenHeader";

const CategoryProduct = () => {
  const { cateId } = useLocalSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["products", cateId],
    queryFn: () => getProductsByCategoryId(cateId as string),
  });

  const category = useMemo(
    () => categories.find((item) => item.id === cateId),
    [cateId]
  );

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <SafeAreaView className="px-3 mt-12 flex-1">
      <ScreenHeader title={category?.name || ""} leftIcon={category?.icon} />
      <View className="my-4">
        <SearchBar onChange={setSearchTerm} />
      </View>
      {isLoading ? (
        <ProductListSkeleton />
      ) : (
        <View className="grow-[1] h-[400px]">
          <ProductList products={filteredProducts} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoryProduct;

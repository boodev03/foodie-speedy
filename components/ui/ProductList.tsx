import { Product } from "@/constants/product.type";
import React from "react";
import { FlatList, Text, View } from "react-native";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import { getAllLikedProducts } from "@/libs/appwrite/appwrite";
import { useUser } from "@clerk/clerk-expo";

interface IProps {
  products: Product[];
  isLiked?: boolean;
}

const ProductList = ({ products, isLiked }: IProps) => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["product.liked"],
    queryFn: () =>
      getAllLikedProducts(user?.emailAddresses[0].emailAddress as string),
  });
  return (
    <View className="min-h-[400px]">
      {products.length === 0 ? (
        <Text className="text-[30px] text-center mt-5 font-bold tracking-[1.5px] capitalize text-neutral-100 font-[Roboto]">
          Not Found
        </Text>
      ) : (
        <FlatList
          nestedScrollEnabled
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (!isLiked) {
              console.log(
                data?.products.find((p) => p.id === item.id),
                item.name,
                "a"
              );
            }
            return (
              <ProductItem
                key={item.id}
                product={item}
                isLiked={
                  isLiked
                    ? true
                    : data?.products.find((p) => p.id === item.id)
                    ? true
                    : false
                }
              />
            );
          }}
          numColumns={2}
          columnWrapperStyle={{
            gap: 12,
          }}
          contentContainerStyle={{
            gap: 12,
            paddingBottom: 12,
          }}
          className="pb-10"
        />
      )}
    </View>
  );
};

export default ProductList;

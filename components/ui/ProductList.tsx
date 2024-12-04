import { Product } from "@/constants/product.type";
import React from "react";
import { FlatList, Text, View } from "react-native";
import ProductItem from "./ProductItem";

interface IProps {
  products: Product[];
}

const ProductList = ({ products }: IProps) => {
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
          renderItem={({ item }) => (
            <ProductItem key={item.id} product={item} />
          )}
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

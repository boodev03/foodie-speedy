import React from "react";
import { FlatList } from "react-native";
import ProductItemSkeleton from "./ProductItemSkeleton";

const ProductListSkeleton = () => {
  return (
    <FlatList
      nestedScrollEnabled
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => <ProductItemSkeleton key={item} />}
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
  );
};

export default ProductListSkeleton;

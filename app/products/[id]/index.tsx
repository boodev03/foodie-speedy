import ProductDetail from "@/components/products/ProductDetail";
import { StatusBar } from "expo-status-bar";
import React from "react";

const ProductDetailScreen = () => {
  return (
    <>
      <ProductDetail />
      <StatusBar style="auto" />
    </>
  );
};

export default ProductDetailScreen;

import CategoryProduct from "@/components/products/CategoryProduct";
import { StatusBar } from "expo-status-bar";
import React from "react";

const CategoryProductScreen = () => {
  return (
    <>
      <CategoryProduct />
      <StatusBar style="auto" />
    </>
  );
};

export default CategoryProductScreen;

import Basket from "@/components/basket/Basket";
import { StatusBar } from "expo-status-bar";
import React from "react";

const BasketScreen = () => {
  return (
    <>
      <Basket />
      <StatusBar style="auto" />
    </>
  );
};

export default BasketScreen;

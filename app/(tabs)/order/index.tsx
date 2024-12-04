import Order from "@/components/order/Order";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function OrderTab() {
  return (
    <>
      <Order />
      <StatusBar style="auto" />
    </>
  );
}

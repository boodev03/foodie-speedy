import Home from "@/components/home/Home";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function HomeTab() {
  return (
    <>
      <Home />
      <StatusBar style="auto" />
    </>
  );
}

import Liked from "@/components/liked/Liked";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function HomeTab() {
  return (
    <>
      <Liked />
      <StatusBar style="auto" />
    </>
  );
}

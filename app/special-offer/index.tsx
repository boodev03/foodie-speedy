import SpecialOffer from "@/components/special-offer/SpecialOffer";
import { StatusBar } from "expo-status-bar";
import React from "react";

const SpecialOffersScreen = () => {
  return (
    <>
      <SpecialOffer />
      <StatusBar style="auto" />
    </>
  );
};

export default SpecialOffersScreen;

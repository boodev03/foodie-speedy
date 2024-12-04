import LocationSearch from "@/components/location-search/LocationSearch";
import { StatusBar } from "expo-status-bar";
import React from "react";

const LocationSearchScreen = () => {
  return (
    <>
      <LocationSearch />
      <StatusBar style="auto" />
    </>
  );
};

export default LocationSearchScreen;

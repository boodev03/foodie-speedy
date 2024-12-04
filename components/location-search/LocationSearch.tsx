import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View className="flex-1 mt-12">
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="absolute left-[16px] top-[18px] z-[1]">
            <Ionicons
              name="search-outline"
              size={24}
              style={{ backgroundColor: "#d3d3d3" }}
            />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: "#d3d3d3",
            paddingLeft: 36,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
            borderRadius: 10,
          },
        }}
      />
      <MapView showsUserLocation={true} className="flex-1" region={location} />
      <View className="absolute bottom-5 w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-primary-500 p-4 m-4 items-center rounded-[8px]"
        >
          <Text className="text-white font-[Roboto-Bold] text-base">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSearch;

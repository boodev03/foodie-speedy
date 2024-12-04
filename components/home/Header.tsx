import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import ShoppingBagIcon from "@/assets/icons/ShoppingBagIcon";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet from "../BottomSheet";
import React, { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Header = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  return (
    <>
      <BottomSheet ref={bottomSheetRef} />
      <View className="mt-12 flex-row justify-between items-center">
        <View>
          <View className="flex-row gap-x-2">
            <Text className="text-neutral-900 text-base">Deliver to</Text>
            <Text className="text-neutral-900 font-[Roboto-Bold] text-base">
              {"->"}
            </Text>
            <Text className="text-neutral-900 font-[Roboto-Bold] text-base">
              Home
            </Text>
          </View>
          <TouchableOpacity
            onPress={openModal}
            className="flex-row gap-x-2 items-center"
          >
            <Text className="text-lg font-[Roboto-Medium] text-neutral-200">
              Select Your Location
            </Text>
            <ArrowDownIcon />
          </TouchableOpacity>
        </View>
        <View>
          <ShoppingBagIcon />
        </View>
      </View>
    </>
  );
};

export default Header;

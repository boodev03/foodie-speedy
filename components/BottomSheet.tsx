import { View, Text, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheet,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        borderRadius: 0,
      }}
    >
      <BottomSheetScrollView className="flex-1">
        <View className="flex-row justify-center gap-3 mb-8">
          <TouchableOpacity className="bg-primary-500 p-2 rounded-[32px] px-[30px]">
            <Text className="text-white font-[Roboto-Bold]">Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-[32px] px-[30px]">
            <Text className="text-primary-500 font-[Roboto-Medium]">
              Pickup
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-base font-[Roboto-Bold] m-4">My Location</Text>
        <Link href={"/(modal)/location-search"} asChild>
          <TouchableOpacity>
            <View className="flex-row gap-x-2 items-center p-4 border border-[#d3d3d3]">
              <Ionicons name="location-outline" size={20} />
              <Text className="flex-1">Current location</Text>
              <Ionicons name="chevron-forward" color="#ff6347" size={20} />
            </View>
          </TouchableOpacity>
        </Link>
        <Text className="text-base font-[Roboto-Bold] m-4">Arriaval Time</Text>
        <TouchableOpacity>
          <View className="flex-row gap-x-2 items-center p-4 border border-[#d3d3d3]">
            <Ionicons name="stopwatch-outline" size={20} />
            <Text className="flex-1">Now</Text>
            <Ionicons name="chevron-forward" color="#ff6347" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dismiss()}
          className="bg-primary-500 p-4 rounded-[4px] m-4 items-center"
        >
          <Text className="text-white font-[Roboto-Bold]">Confirm</Text>
        </TouchableOpacity>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default BottomSheet;

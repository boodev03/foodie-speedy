import React from "react";
import { Pressable, View } from "react-native";
import FSText from "../FSText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ScreenHeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  textColor?: string;
  showBack?: boolean;
}

export const ScreenHeader = ({
  title,
  leftIcon,
  textColor = "black",
  showBack = true,
}: ScreenHeaderProps) => {
  return (
    <View className="flex-row items-center justify-center relative">
      {showBack && (
        <Pressable onPress={() => router.back()} className="absolute left-0">
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </Pressable>
      )}
      {leftIcon}
      <FSText
        variant="heading1"
        weight="600"
        className={`${
          textColor === "white" ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </FSText>
    </View>
  );
};

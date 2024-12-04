import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface ScreenHeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
}

export const ScreenHeader = ({ title, leftIcon }: ScreenHeaderProps) => {
  const onBack = () => {
    router.back();
  };
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBack}
        className="w-10 h-10 rounded-[22px] flex justify-center items-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          shadowColor: "rgba(13, 10, 44, 0.06)",
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          shadowOpacity: 0.06,
          elevation: 2,
        }}
      >
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View className="flex-1 flex-row justify-center gap-x-2">
        {leftIcon}
        <Text className="text-[22px] font-[Roboto-Bold] text-neutral-900">
          {title}
        </Text>
      </View>
      <View className="w-10 h-10"></View>
    </View>
  );
};

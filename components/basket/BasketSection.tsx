import AltArrowRight from "@/assets/icons/AltArrowRight";
import React from "react";
import { View } from "react-native";
import FSText from "../FSText";

interface IProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  href: string;
  defaultContent: string;
}

const BasketSection = ({
  content,
  href,
  icon,
  title,
  defaultContent,
}: IProps) => {
  return (
    <View className="flex-row justify-between items-center p-4 rounded-[12px] border border-neutral-50">
      <View className="space-y-2">
        <View className="flex-row gap-x-2">
          {icon}
          <FSText className="text-neutral-900">{title}</FSText>
        </View>
        {content ? (
          <FSText className="text-neutral-900" numberOfLines={1} weight="600">
            {content}
          </FSText>
        ) : (
          <FSText className="text-neutral-100" numberOfLines={1} weight="600">
            {defaultContent}
          </FSText>
        )}
      </View>
      <AltArrowRight />
    </View>
  );
};

export default BasketSection;

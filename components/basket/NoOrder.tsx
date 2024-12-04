import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import FSText from "../FSText";
import { Button } from "../ui/Button";

const NoOrder = () => {
  return (
    <View className="flex-1 items-center justify-center px-6 space-y-4">
      <FSText
        variant="heading1"
        weight="600"
        className="text-neutral-900 text-center"
      >
        Your Basket is Empty
      </FSText>

      <FSText
        variant="body"
        weight="400"
        className="text-neutral-500 text-center"
      >
        Looks like you haven't added anything to your basket yet. Start
        exploring our delicious menu!
      </FSText>

      <Button
        title="Back to Home"
        size="lg"
        className="w-full mt-4"
        onPress={() => router.push("/")}
      />
    </View>
  );
};

export default NoOrder;

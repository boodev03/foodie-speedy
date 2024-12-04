import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FSText from "@/components/FSText";
import { Button } from "@/components/ui/Button";
import { router } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";

const PaymentSuccess = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4">
      <View className="items-center space-y-4">
        <CheckCircle2 size={80} color="#22C55E" />
        <FSText variant="heading1" className="text-center" weight="600">
          Payment Successful!
        </FSText>
        <FSText variant="body" className="text-center text-neutral-600">
          Your order has been placed successfully. You can track your order in
          the orders section.
        </FSText>
      </View>

      <View className="absolute bottom-8 left-4 right-4">
        <Button
          title="Continue Shopping"
          size="lg"
          onPress={() => {
            router.push("/");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

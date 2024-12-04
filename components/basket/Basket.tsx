import { createPayment, getShoppingCart } from "@/libs/appwrite/appwrite";
import { formatToUSD } from "@/utils/formatCurrency";
import { useUser } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import FSText from "../FSText";
import { Button } from "../ui/Button";
import { ScreenHeader } from "../ui/ScreenHeader";
import BasketProductList from "./BasketProductList";
import NoOrder from "./NoOrder";

const Basket = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { data: shoppingSession } = useQuery({
    queryKey: ["shopping.sesison", user?.emailAddresses[0].emailAddress],
    queryFn: () =>
      getShoppingCart(user?.emailAddresses[0].emailAddress as string),
  });

  const [productQuantities, setProductQuantities] = useState<{
    [id: string]: number;
  }>({});

  const handleIncreaseQuantity = (id: string) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (id: string) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] > 1 ? prevQuantities[id] - 1 : 1,
    }));
  };

  const onPlaceOrder = async () => {
    if (!shoppingSession) return;
    setIsLoading(true);
    try {
      const res = await createPayment(0, shoppingSession[0]);
      if (res?.client_secret) {
        const { error } = await initPaymentSheet({
          paymentIntentClientSecret: res?.client_secret,
          merchantDisplayName: "Checkout",
        });
        if (error) {
          console.error("Error initializing payment sheet: ", error);
          return;
        }

        const { error: paymentError } = await presentPaymentSheet();

        if (paymentError) {
          console.error("Payment failed: ", paymentError);
        } else {
          console.log("Payment successful!");

          await fetch("https://67027e4b211ccc434df1.appwrite.global/webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "stripe-signature": JSON.stringify({
                secret: "whsec_Y8wDh3Hyx30vDaZ3CZEiX4wLhGRDPv4w",
                payload: {
                  ...res,
                  type: "checkout.session.completed",
                  payment_status: "paid",
                },
              }),
            },
          });

          router.push("/payment-success");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!shoppingSession || shoppingSession.length === 0) {
    return <NoOrder />;
  }
  return (
    <SafeAreaView className="mt-5 flex-1 space-y-6">
      <View className="px-3">
        <ScreenHeader title="My Basket" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="grow"
        contentContainerStyle={{
          paddingHorizontal: 12,
          flexGrow: 1,
        }}
      >
        <View>
          <BasketProductList
            productQuantities={productQuantities}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
          />
        </View>
      </ScrollView>

      <View
        style={{
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
          shadowColor: "rgba(13, 10, 44, 0.20)",
          elevation: 20,
        }}
        className="flex-row justify-between items-center absolute bottom-4 left-0 right-0 bg-white rounded-[12px] h-[77px] pl-4 pr-2 mx-3"
      >
        <FSText variant="heading2" className="text-neutral-900" weight="600">
          {shoppingSession
            ? formatToUSD(
                shoppingSession?.[0].cartItems.reduce((acc, item) => {
                  const toppingPrices = item.toppings_price
                    ? item.toppings_price.reduce(
                        (toppingAcc, topping) => toppingAcc + topping,
                        0
                      )
                    : 0;
                  return (
                    acc +
                    item.price * (productQuantities[item.id] || item.quantity) +
                    toppingPrices
                  );
                }, 0)
              )
            : 0}
        </FSText>
        <Button
          activeOpacity={0.9}
          size="lg"
          title={isLoading ? "Place Order ..." : "Place Order"}
          onPress={() => onPlaceOrder()}
          disabled={isLoading}
          style={[
            {
              opacity: isLoading ? 0.5 : 1,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Basket;

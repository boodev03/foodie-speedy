import { tokenCache } from "@/helpers/tokenCache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import * as Linking from "expo-linking";
import { StripeProvider } from "@stripe/stripe-react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded, error] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider
      clerkJSVersion="5.18.0"
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <StripeProvider publishableKey="pk_test_51Q6t7IRpvH3tqV2nALTOxr3BoiVMHsxjtDN7WOKgySGK6uCo3g6hpSftcQIDLuEhryWaZ6xlYjhOC39fzFjqqE8x00zoxabsXZ">
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "white" },
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="special-offer/index"
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen name="products/category/[cateId]/index" />
                  <Stack.Screen name="products/[id]/index" />
                  <Stack.Screen name="(modal)/location-search" />
                  <Stack.Screen name="basket/index" />
                  <Stack.Screen name="(modal)/order/[id]/order-detail" />
                </Stack>
              </StripeProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

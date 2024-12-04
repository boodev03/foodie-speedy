import React from "react";
import { View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../ui/ScreenHeader";
import FSText from "../FSText";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

const UserScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const menuItems = [
    {
      icon: "person-outline",
      label: "Edit Profile",
      description: "Update your personal information",
      onPress: () => router.push("/profile"),
    },
    {
      icon: "log-out-outline",
      label: "Sign Out",
      description: "Sign out of your account",
      onPress: () => {
        if (confirm("Are you sure you want to sign out?")) {
          signOut();
        }
      },
      danger: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="px-6 pt-5 pb-16 bg-primary-500">
        <ScreenHeader title="Profile" textColor="white" showBack={false} />

        {/* User Info */}
        <View className="items-center mt-8">
          <View className="w-28 h-28 rounded-full bg-white items-center justify-center overflow-hidden border-4 border-white/50">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={52} color="#6366F1" />
            )}
          </View>
          <View className="mt-4 items-center">
            <FSText
              variant="heading2"
              weight="600"
              className="text-white text-2xl mb-1"
            >
              {user?.firstName} {user?.lastName}
            </FSText>
            <FSText variant="body" className="text-white/80">
              {user?.emailAddresses[0].emailAddress}
            </FSText>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View className="px-6 -mt-8 z-10">
        <View className="bg-white rounded-3xl py-4 shadow-lg">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.onPress}
              className={`
                flex-row items-center
                py-4 px-6 
                ${
                  index !== menuItems.length - 1
                    ? "border-b border-neutral-100"
                    : ""
                }
                active:bg-neutral-50
              `}
            >
              <View
                className={`
                w-12 h-12 rounded-full items-center justify-center mr-4
                ${item.danger ? "bg-red-100" : "bg-primary-50"}
              `}
              >
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.danger ? "#DC2626" : "#6366F1"}
                />
              </View>
              <View className="flex-1">
                <FSText
                  variant="body"
                  weight="600"
                  className={`text-lg mb-0.5 ${
                    item.danger ? "text-red-600" : "text-black"
                  }`}
                >
                  {item.label}
                </FSText>
                <FSText variant="caption" className="text-neutral-500">
                  {item.description}
                </FSText>
              </View>
              {!item.danger && (
                <Ionicons name="chevron-forward" size={20} color="#6366F1" />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Version Info */}
      <View className="absolute bottom-8 w-full items-center">
        <FSText variant="caption" className="text-neutral-400">
          Version 1.0.0
        </FSText>
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

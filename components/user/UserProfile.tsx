import React, { useState } from "react";
import { View, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../ui/ScreenHeader";
import FSText from "../FSText";
import { Button } from "../ui/Button";
import { useUser } from "@clerk/clerk-expo";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/libs/appwrite/appwrite";
import { router } from "expo-router";

const UserProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.emailAddresses[0].emailAddress],
    queryFn: () =>
      getUserProfile(user?.emailAddresses[0].emailAddress as string),
  });

  const [formData, setFormData] = useState({
    phone_number: profile?.phone_number || "",
    address: profile?.address || "",
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: typeof formData) =>
      updateUserProfile(user?.emailAddresses[0].emailAddress as string, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile", user?.emailAddresses[0].emailAddress],
      });
      router.back();
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-5">
        <ScreenHeader title="My Profile" />
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        {/* User Info Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full mb-4 items-center justify-center overflow-hidden border-4 border-primary-100">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="w-full h-full bg-primary-100 items-center justify-center">
                <FSText
                  variant="heading2"
                  className="text-primary-600 text-2xl"
                >
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </FSText>
              </View>
            )}
          </View>
          <FSText variant="heading2" className="text-xl mb-1">
            {user?.firstName} {user?.lastName}
          </FSText>
          <FSText variant="body" className="text-neutral-500">
            {user?.emailAddresses[0].emailAddress}
          </FSText>
        </View>

        <View className="space-y-6">
          {/* Phone Number */}
          <View>
            <FSText
              variant="body"
              className="text-neutral-500 mb-2 font-medium"
            >
              Phone Number
            </FSText>
            <TextInput
              className={`p-4 rounded-2xl ${
                isEditing
                  ? "bg-white border-2 border-primary-500"
                  : "bg-neutral-50"
              }`}
              value={formData.phone_number}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone_number: text }))
              }
              editable={isEditing}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Delivery Address */}
          <View>
            <FSText
              variant="body"
              className="text-neutral-500 mb-2 font-medium"
            >
              Delivery Address
            </FSText>
            <TextInput
              className={`p-4 rounded-2xl ${
                isEditing
                  ? "bg-white border-2 border-primary-500"
                  : "bg-neutral-50"
              } min-h-[100px]`}
              value={formData.address}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, address: text }))
              }
              editable={isEditing}
              placeholder="Enter your delivery address"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-6 py-8 border-t border-neutral-100">
        {isEditing ? (
          <View className="flex-row space-x-4">
            <Button
              title="Cancel"
              variant="outline"
              size="lg"
              className="flex-1"
              onPress={() => {
                setIsEditing(false);
                setFormData({
                  phone_number: profile?.phone_number || "",
                  address: profile?.address || "",
                });
              }}
            />
            <Button
              title="Save Changes"
              size="lg"
              className="flex-1"
              onPress={handleSave}
              disabled={updateProfileMutation.isPending}
            />
          </View>
        ) : (
          <Button
            title="Edit Profile"
            size="lg"
            onPress={() => setIsEditing(true)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;

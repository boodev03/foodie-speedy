import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type NotificationType = "success" | "warning" | "error" | "info";
type IconName = "check-circle" | "warning" | "error" | "info";

interface NotifyPopupProps {
  visible: boolean;
  onHide: () => void;
  message: string;
  duration?: number;
  type?: NotificationType;
}

const NotifyPopup = ({
  visible,
  onHide,
  message,
  duration = 3000,
  type = "success",
}: NotifyPopupProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const [timeLeft, setTimeLeft] = React.useState(duration / 1000);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      setTimeLeft(duration / 1000);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            hidePopup();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [visible, duration]);

  const hidePopup = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 0.8,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
  };

  if (!visible) return null;

  const getTypeStyles = (
    notificationType: NotificationType
  ): { bgColor: string; textColor: string; icon: IconName } => {
    switch (notificationType) {
      case "success":
        return {
          bgColor: "bg-green-500",
          textColor: "text-green-800",
          icon: "check-circle",
        };
      case "warning":
        return {
          bgColor: "bg-yellow-500",
          textColor: "text-yellow-800",
          icon: "warning",
        };
      case "error":
        return {
          bgColor: "bg-red-500",
          textColor: "text-red-800",
          icon: "error",
        };
      case "info":
      default:
        return {
          bgColor: "bg-blue-500",
          textColor: "text-blue-800",
          icon: "info",
        };
    }
  };

  const { bgColor, textColor, icon } = getTypeStyles(type);

  return (
    <View className="absolute inset-0 w-screen h-screen flex items-center justify-center">
      <Animated.View
        style={{ opacity, transform: [{ scale }] }}
        className={`min-w-[60%] bg-white rounded-lg shadow-lg p-4 items-center`}
      >
        <View className={`${bgColor} rounded-full p-2 mb-2`}>
          <MaterialIcons name={icon} size={24} color="white" />
        </View>
        <Text className={`text-base font-bold ${textColor} mb-1`}>
          {message}
        </Text>
        <Text className="text-sm text-gray-600">{timeLeft}</Text>
      </Animated.View>
    </View>
  );
};

export default NotifyPopup;

import React from "react";
import { Text, TextProps, StyleSheet, TextStyle } from "react-native";

type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type VariantStyles = {
  heading1: TextStyle;
  heading2: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  // Thêm các variant khác ở đây
};

type VariantType = keyof VariantStyles;

interface FSTextProps extends TextProps {
  variant?: VariantType;
  weight?: FontWeight;
}

const fontFamily = (weight: FontWeight): string => {
  switch (weight) {
    case "bold":
    case "700":
      return "Roboto-Bold";
    case "500":
    case "600":
      return "Roboto-Medium";
    case "300":
      return "Roboto-Light";
    default:
      return "Roboto-Regular";
  }
};

const styles = StyleSheet.create<VariantStyles>({
  heading1: {
    fontSize: 24,
    lineHeight: 32,
  },
  heading2: {
    fontSize: 22,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 19,
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
  },
});

const FSText = ({
  style,
  variant = "body",
  weight = "normal",
  ...props
}: FSTextProps) => {
  return (
    <Text
      style={[styles[variant], { fontFamily: fontFamily(weight) }, style]}
      {...props}
    />
  );
};

export default FSText;

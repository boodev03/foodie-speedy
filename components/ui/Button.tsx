import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("flex items-center justify-center rounded-md", {
  variants: {
    variant: {
      default:
        "bg-primary-500 rounded-[28px] flex flex-row items-center justify-center",
      link: "bg-transparent",
      outline:
        "bg-transparent border border-primary-500 rounded-[100px] px-2 py-1",
    },
    size: {
      default: "",
      md: "h-[40px] px-3 space-x-2",
      lg: "h-[50px] px-4 space-x-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const textVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-white font-bold font-[Roboto] text-[18px]",
      link: "text-neutral-300 font-[Roboto-Medium] text-base leading-[19px] text-right underline",
      rounded: "text-white font-bold font-[Roboto] text-[18px]",
      outline: "text-primary-500 font-[Roboto-Medium] text-[12px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  title: string;
  leftIcon?: React.ReactNode;
  textStyles?: string;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    { className, title, variant, size, leftIcon, textStyles, ...props },
    ref
  ) => {
    return (
      <TouchableOpacity
        className={twMerge(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon}
        <Text className={twMerge(textVariants({ variant }), textStyles)}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

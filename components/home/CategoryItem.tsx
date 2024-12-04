import { CategoryItemProps } from "@/constants/category.type";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

interface IProps {
  category: CategoryItemProps;
}

const CategoryItem = ({ category }: IProps) => {
  return (
    <TouchableOpacity
      className="space-y-2 py-2 items-center w-full rounded-[8px] bg-white mb-6"
      activeOpacity={0.8}
      style={{
        shadowColor: "rgba(13, 10, 44, 0.06)",
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 6,
        elevation: 2.5,
      }}
      onPress={() => router.push(`/products/category/${category.id}` as const)}
    >
      {category.icon}
      <Text className="font-[Roboto-Medium] text-xs text-neutral-900">
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

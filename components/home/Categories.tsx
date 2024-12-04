import BanhMiIcon from "@/assets/icons/BanhMiIcon";
import BurgerIcon from "@/assets/icons/BurgerIcon";
import BurritoIcon from "@/assets/icons/BurritoIcon";
import CookiesIcon from "@/assets/icons/CookiesIcon";
import DonutIcon from "@/assets/icons/DonutIcon";
import DrinkIcon from "@/assets/icons/DrinkIcon";
import DumplingIcon from "@/assets/icons/DumplingIcon";
import FruitIcon from "@/assets/icons/FruitIcon";
import GoiCuonIcon from "@/assets/icons/GoiCuonIcon";
import IceCreamIcon from "@/assets/icons/IceCreamIcon";
import NoodlesIcon from "@/assets/icons/NoodlesIcon";
import PastaIcon from "@/assets/icons/PastaIcon";
import PizzaIcon from "@/assets/icons/PizzaIcon";
import PuddingIcon from "@/assets/icons/PuddingIcon";
import RiceIcon from "@/assets/icons/RiceIcon";
import SaladIcon from "@/assets/icons/SaladIcon";
import SandwichIcon from "@/assets/icons/SandwichIcon";
import SausageIcon from "@/assets/icons/SausageIcon";
import TacoIcon from "@/assets/icons/TacoIcon";
import TakoyakiIcon from "@/assets/icons/TakoyakiIcon";
import { CategoryItemProps } from "@/constants/category.type";
import { Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
import ThreeDotIcon from "@/assets/icons/ThreeDotIcon";

export const categories: CategoryItemProps[] = [
  { id: "burger", name: "Burger", icon: <BurgerIcon /> },
  { id: "burrito", name: "Burrito", icon: <BurritoIcon /> },
  { id: "taco", name: "Taco", icon: <TacoIcon /> },
  { id: "drink", name: "Drink", icon: <DrinkIcon /> },
  { id: "pizza", name: "Pizza", icon: <PizzaIcon /> },
  { id: "donut", name: "Donut", icon: <DonutIcon /> },
  { id: "salad", name: "Salad", icon: <SaladIcon /> },
  { id: "noodles", name: "Noodles", icon: <NoodlesIcon /> },
  { id: "sandwich", name: "Sandwich", icon: <SandwichIcon /> },
  { id: "pasta", name: "Pasta", icon: <PastaIcon /> },
  { id: "ice-cream", name: "Ice Cream", icon: <IceCreamIcon /> },
  { id: "rice", name: "Rice", icon: <RiceIcon /> },
  { id: "takoyaki", name: "Takoyaki", icon: <TakoyakiIcon /> },
  { id: "fruit", name: "Fruit", icon: <FruitIcon /> },
  { id: "sausage", name: "Sausage", icon: <SausageIcon /> },
  { id: "goi-cuon", name: "Goi Cuon", icon: <GoiCuonIcon /> },
  { id: "cookie", name: "Cookie", icon: <CookiesIcon /> },
  { id: "pudding", name: "Pudding", icon: <PuddingIcon /> },
  { id: "banh-mi", name: "Banh Mi", icon: <BanhMiIcon /> },
  { id: "dumpling", name: "Dumpling", icon: <DumplingIcon /> },
];
// need responsive

const Categories = () => {
  return (
    <View className="flex-row flex-wrap -mx-3 mt-6 mb-2">
      {categories.slice(0, 11).map((category) => (
        <View key={category.name} className="px-3 w-1/4">
          <CategoryItem category={category} />
        </View>
      ))}
      {/* More Button */}
      <View className="px-3 w-1/4">
        <View className="space-y-2 py-2 items-center w-full rounded-[8px] bg-white mb-6">
          <ThreeDotIcon />
          <Text className="font-[Roboto-Medium] text-xs text-neutral-900">
            More
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Categories;

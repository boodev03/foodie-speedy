import LikedIconSmall from "@/assets/icons/LikedIconSmall";
import RateStarIcon from "@/assets/icons/RateStarIcon";
import { Product } from "@/constants/product.type";
import { formatToUSD } from "@/utils/formatCurrency";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  product: Product;
}

const ProductItem = ({ product }: IProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-1 bg-white rounded-[10px] space-y-2 p-2"
      style={{
        shadowColor: "rgba(13, 10, 44, 0.06)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 6,
        elevation: 1,
      }}
      onPress={() => router.push(`/products/${product.id}`)}
    >
      <Image
        src={product.thumbnail}
        className="w-full rounded-tl-[10px] rounded-tr-[10px] h-[100px]"
      />
      <Text className="text-xs font-[Roboto-Medium] text-neutral-900">
        {product.name}
      </Text>
      <View className="flex-row gap-x-1 items-center">
        <RateStarIcon width={14} height={14} />
        <Text className="text-xs font-[Roboto-Regular] text-neutral-900">
          {product.rating_score}
        </Text>
        <Text className="text-xs font-[Roboto-Regular] text-neutral-900">
          (Đã bán {product.total_sales || 0})
        </Text>
      </View>
      <View className="flex-row gap-x-2 items-center">
        <Text className="text-sm text-neutral-200 line-through font-[Roboto-Regular]">
          {formatToUSD(product.price_original)}
        </Text>
        <Text className="text-sm text-primary-500 font-[Roboto-Bold]">
          {formatToUSD(product.price_discounted)}
        </Text>
      </View>
      <View className="absolute top-2 right-3 w-6 h-6 rounded-full bg-white justify-center items-center">
        <LikedIconSmall />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

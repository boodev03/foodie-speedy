import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import LikedIconFill from "@/assets/icons/LikedIconFill";
import LikedOutlineIcon from "@/assets/icons/LikedOutlineIcon";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import RateStarIcon from "@/assets/icons/RateStarIcon";
import ShoppingBagFillIcon from "@/assets/icons/ShoppingBagFillIcon";
import { Topping } from "@/constants/product.type";
import { useAddProductToBasket } from "@/hooks/useAddProductToBasket";
import { useUpdateLikedProduct } from "@/hooks/useUpdateLikedProduct";
import {
  getAllLikedProducts,
  getProductById,
  getShoppingCart,
} from "@/libs/appwrite/appwrite";
import { AddToBasketPayload } from "@/libs/appwrite/payload.type";
import { formatToUSD } from "@/utils/formatCurrency";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../ui/Button";
import ProductDetailSkeleton from "../ui/loading/ProductDetailSkeleton";
import CustomCheckbox from "../ui/MyCheckbox";
import NotifyPopup from "../ui/popup/NotifyPopup";
import { NotifyPopupProps } from "@/constants/types";

const ProductDetail = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
  });

  const { data: likedProducts } = useQuery({
    queryKey: ["product.liked"],
    queryFn: () =>
      getAllLikedProducts(user?.emailAddresses[0].emailAddress as string),
  });

  const { data: shoppingSession } = useQuery({
    queryKey: ["shopping.sesison", user?.emailAddresses[0].emailAddress],
    queryFn: () =>
      getShoppingCart(user?.emailAddresses[0].emailAddress as string),
  });

  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState(1);

  const [notifyPopup, setNotifyPopup] = useState<NotifyPopupProps>({
    message: "Added to cart",
    type: "success",
    show: false,
  });

  const updateLikedProductMutation = useUpdateLikedProduct();
  const addProductToBasketMutation = useAddProductToBasket();

  const onPressLiked = async () => {
    const likedProductIds =
      likedProducts?.products
        .filter((product) => (isLikedProduct ? product.id !== id : product.id))
        .map((item) => item.id) || [];
    !isLikedProduct && likedProductIds.push(id as string);

    await updateLikedProductMutation.mutateAsync({
      docId: likedProducts?.id as string,
      likedProductIds,
    });
  };

  const isLikedProduct = useMemo(() => {
    return (
      likedProducts?.products.findIndex((product) => product.id === id) !== -1
    );
  }, [likedProducts]);

  const onSelectedTopping = (topping: Topping) => {
    const index = selectedToppings.findIndex((item) => item.id === topping.id);
    if (index === -1) {
      setSelectedToppings([...selectedToppings, topping]);
    } else {
      setSelectedToppings(
        selectedToppings.filter((item) => item.id !== topping.id)
      );
    }
  };

  const handleAddProductToBasket = async () => {
    const payload: AddToBasketPayload = {
      product_id: id as string,
      quantity,
      toppings: selectedToppings.map((topping) => topping.id),
      toppings_price: selectedToppings.map((topping) => topping.price),
      price: data?.price_discounted || 0,
    };
    try {
      await addProductToBasketMutation.mutateAsync({
        email: user?.emailAddresses[0].emailAddress as string,
        payload,
        currentShoppingSession: shoppingSession
          ? shoppingSession[0]
          : shoppingSession,
      });
      setNotifyPopup({ message: "Added to cart", show: true, type: "success" });
    } catch (e) {
      setNotifyPopup({
        message: "Something went wrong",
        show: true,
        type: "error",
      });
    }
  };

  const productQuantityInBasket = useMemo(() => {
    if (shoppingSession && shoppingSession.length > 0) {
      return (
        shoppingSession[0].cartItems.find((item) => item.product_id === id)
          ?.quantity || 0
      );
    }

    return 0;
  }, [shoppingSession]);

  if (isLoading) return <ProductDetailSkeleton />;

  return (
    <SafeAreaView className="px-3 mt-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-[150px]">
          <View className="mb-5 relative">
            <Image
              className="w-full h-[300px] object-contain rounded-[12px]"
              src={data?.thumbnail}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              className="w-10 h-10 rounded-[22px] flex justify-center items-center absolute top-8 left-5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>

            {!!productQuantityInBasket && (
              <Button
                className="absolute top-4 right-3"
                activeOpacity={0.9}
                onPress={() => router.push("/basket")}
                size="md"
                title={`${productQuantityInBasket}`}
                leftIcon={<ShoppingBagFillIcon />}
                textStyles="w-[26px] h-[26px] rounded-full text-center bg-white text-primary-500 font-[Roboto-Medium] text-base"
              />
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onPressLiked}
              className="absolute bottom-4 right-3 w-10 h-10 rounded-full bg-white justify-center items-center"
            >
              {isLikedProduct ? (
                <LikedIconFill fill="#ff6347" />
              ) : (
                <LikedOutlineIcon />
              )}
            </TouchableOpacity>
          </View>

          <View className="space-y-4 px-3">
            <Text className="text-[22px] leading-[22px] font-bold font-[Roboto] text-neutral-900">
              {data?.name}
            </Text>
            <View className="flex-row gap-x-2 items-center">
              <Text className="text-[20px] leading-[20px] text-neutral-200 line-through font-[Roboto-Regular]">
                {formatToUSD(data?.price_original || 0)}
              </Text>
              <Text className="text-[22px] leading-[22px] text-primary-500 font-[Roboto-Bold]">
                {formatToUSD(data?.price_discounted || 0)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-x-2 items-center">
                <RateStarIcon className="shrink-0 relative bottom-[1px]" />
                <Text className="text-base leading-[19px] font-[Roboto-Regular] text-neutral-900">
                  {data?.rating_score}
                </Text>
                <Text className="text-base leading-[19px] font-[Roboto-Regular] text-neutral-300">
                  ({data?.rating_count})
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.9}>
                <Button
                  title="See all review"
                  variant="link"
                  onPress={() => {}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                numberOfLines={3}
                className="text-base font-[Roboto-Light] text-neutral-300"
              >
                {data?.description}
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex justify-end flex-row"
              >
                <Button title="See more" variant="link" onPress={() => {}} />
              </TouchableOpacity>
            </View>

            {data?.available_toppings &&
              data?.available_toppings.length > 0 && (
                <View className="space-y-4">
                  <Text className="text-[18px] leading-[21px] text-neutral-900 font-bold font-[Roboto]">
                    Additional Options
                  </Text>
                  {data?.available_toppings.map((topping) => (
                    <View
                      key={topping.id}
                      className="flex-row justify-between items-center"
                    >
                      <Text className="flex-1 text-base leading-[19px] font-[Roboto] text-neutral-900">
                        Add {topping.name}
                      </Text>
                      <Text className="mr-3 text-base leading-[19px] font-[Roboto] text-neutral-900">
                        +{formatToUSD(topping.price)}
                      </Text>
                      <CustomCheckbox
                        onValueChange={() => onSelectedTopping(topping)}
                        value={
                          selectedToppings.find(
                            (item) => item.id === topping.id
                          )
                            ? true
                            : false
                        }
                      />
                    </View>
                  ))}
                </View>
              )}
          </View>
        </View>
      </ScrollView>

      <NotifyPopup
        visible={notifyPopup.show}
        onHide={() =>
          setNotifyPopup({ message: "", show: false, type: "success" })
        }
        message={notifyPopup.message}
      />
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
        <View className="flex-row space-x-3 items-center">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setQuantity((pre) => (pre === 1 ? 1 : pre - 1))}
            className="w-10 h-10 rounded-full flex justify-center items-center"
            style={{
              borderWidth: 1,
              borderColor: "#E9EAEB",
            }}
          >
            <MinusIcon />
          </TouchableOpacity>
          <Text className="text-[22px] leading-[26px] font-[Roboto] text-neutral-900">
            {quantity}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full flex justify-center items-center"
            style={{
              borderWidth: 1,
              borderColor: "#E9EAEB",
            }}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>
        <Button
          activeOpacity={0.9}
          onPress={handleAddProductToBasket}
          size="lg"
          title="Add to Basket"
          leftIcon={<ShoppingBagFillIcon />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

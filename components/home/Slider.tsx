import {
  Dimensions,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import SliderItem from "./SliderItem";
import { useEffect, useRef, useState } from "react";

const sliderData: { id: string; image: ImageSourcePropType }[] = [
  {
    id: "banner-1",
    image: require("@/assets/images/home/banner-1.png"),
  },
  {
    id: "banner-2",
    image: require("@/assets/images/home/banner-2.png"),
  },
  {
    id: "banner-3",
    image: require("@/assets/images/home/banner-3.png"),
  },
];

const screenWidth = Dimensions.get("screen").width;

const DotIndicators = ({ currentIndex }: { currentIndex: number }) => {
  return (
    <View className="flex-row justify-start items-center gap-x-[6px] mt-3">
      {sliderData.map((item, index) =>
        currentIndex === index ? (
          <View
            key={item.id}
            className="bg-primary-400 w-[18px] h-[6px] rounded-md"
          ></View>
        ) : (
          <View
            key={item.id}
            className="bg-neutral-100 rounded-full w-[6px] h-[6px]"
          ></View>
        )
      )}
    </View>
  );
};

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPostition = event.nativeEvent.contentOffset.x;
    const index = scrollPostition / screenWidth;
    setCurrentIndex(Math.round(index));
  };

  useEffect(() => {}, []);
  return (
    <View className="my-6">
      <FlatList
        data={sliderData}
        renderItem={({ item }) => (
          <SliderItem image={item.image} key={item.id} />
        )}
        onScroll={handleScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 16,
        }}
        pagingEnabled
      />
      <DotIndicators currentIndex={currentIndex} />
    </View>
  );
};

export default Slider;

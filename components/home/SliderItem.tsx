import { Image, ImageSourcePropType, View } from "react-native";

interface IProps {
  image: ImageSourcePropType;
}

const SliderItem = ({ image }: IProps) => {
  return (
    <View className="w-[304px]">
      <Image source={image} className="w-full" resizeMode="cover" />
    </View>
  );
};

export default SliderItem;

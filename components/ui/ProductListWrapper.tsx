import { useMemo } from "react";
import { View } from "react-native";
import { categories } from "../home/Categories";
import { ScreenHeader } from "./ScreenHeader";

interface BaseProps {
  isCategory: boolean;
}

interface CategoryProps extends BaseProps {
  isCategory: true;
  categoryId: string;
}

interface TitleProps extends BaseProps {
  isCategory: false;
  title: string;
}

type IProps = CategoryProps | TitleProps;

const ProductListWrapper = (props: IProps) => {
  const { isCategory } = props;
  const category = useMemo(() => {
    return isCategory
      ? categories.find((category) => category.id === props.categoryId)
      : undefined;
  }, []);
  return (
    <View>
      <ScreenHeader
        title={isCategory ? (category?.name as string) : props.title}
        leftIcon={isCategory ? category?.icon : undefined}
      />
    </View>
  );
};

export default ProductListWrapper;

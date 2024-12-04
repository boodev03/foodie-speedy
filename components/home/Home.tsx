import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "./Categories";
import Header from "./Header";
import HomeSpecialOffers from "./HomeSpecialOffers";
import SearchBar from "./SearchBar";
import Slider from "./Slider";
import BottomSheet from "../BottomSheet";

const Home = () => {
  return (
    <SafeAreaView className="px-3">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="grow"
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Header />
        <Slider />
        <SearchBar />
        <Categories />
        <HomeSpecialOffers />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

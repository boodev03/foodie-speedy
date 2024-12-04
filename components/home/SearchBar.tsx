import FilterIcon from "@/assets/icons/FilterIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import { TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View
      className="flex-row px-4 space-x-3 items-center w-full h-[48px] rounded-[8px] border border-neutral-100"
      style={{ backgroundColor: "rgba(31, 42, 55, 0.05)" }}
    >
      <SearchIcon />
      <TextInput
        className="text-base flex-1 text-neutral-900"
        placeholder="Categories, product, ..."
      />
      <FilterIcon />
    </View>
  );
};

export default SearchBar;

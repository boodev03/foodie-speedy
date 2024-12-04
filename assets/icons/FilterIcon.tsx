import Svg, { Path, SvgProps } from "react-native-svg";
const FilterIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#0D1217"
      fillRule="evenodd"
      d="M18.25 7a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM14.5 9.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM5.75 17a3.75 3.75 0 1 0 7.5 0 3.75 3.75 0 0 0-7.5 0Zm3.75 2.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#0D1217"
      d="M14.25 16.959a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75ZM9 6.209a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5h7ZM1.25 16.959a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75ZM22 6.209a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h2Z"
    />
  </Svg>
);
export default FilterIcon;

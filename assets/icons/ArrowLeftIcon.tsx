import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowLeftIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      fill="#0D1217"
      fillRule="evenodd"
      d="M11.408 5.925a.812.812 0 0 1 0 1.15l-5.113 5.112h15.372a.813.813 0 0 1 0 1.626H6.295l5.113 5.112a.812.812 0 1 1-1.15 1.15l-6.5-6.5a.812.812 0 0 1 0-1.15l6.5-6.5a.813.813 0 0 1 1.15 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ArrowLeftIcon;

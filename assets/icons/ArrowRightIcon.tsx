import Svg, { SvgProps, Path } from "react-native-svg";
const ArrowRightIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="tomato"
      fillRule="evenodd"
      d="M6.384 3.823a.562.562 0 0 1 .793.06l4.5 5.25c.18.212.18.522 0 .733l-4.5 5.25a.562.562 0 1 1-.854-.732L10.509 9.5 6.323 4.616a.562.562 0 0 1 .06-.793Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ArrowRightIcon;

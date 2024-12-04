import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
const ArrowDownIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="m12.37 15.835 6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={5}
        x2={15.376}
        y1={8}
        y2={19.321}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="tomato" />
        <Stop offset={1} stopColor="#FF826C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ArrowDownIcon;

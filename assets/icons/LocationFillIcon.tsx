import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const LocationFillIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M10 1.667c-3.682 0-6.667 3.335-6.667 7.083 0 3.718 2.128 7.76 5.448 9.312a2.875 2.875 0 0 0 2.438 0c3.32-1.552 5.448-5.594 5.448-9.312 0-3.748-2.985-7.083-6.667-7.083ZM10 10a1.667 1.667 0 1 0 0-3.334A1.667 1.667 0 0 0 10 10Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={3.333}
        x2={20.667}
        y1={1.667}
        y2={10.312}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="tomato" />
        <Stop offset={1} stopColor="#FF826C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default LocationFillIcon;

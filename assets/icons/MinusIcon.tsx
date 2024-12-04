import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const MinusIcon = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      stroke="#0D1217"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 12.5H6"
    />
  </Svg>
);
export default MinusIcon;

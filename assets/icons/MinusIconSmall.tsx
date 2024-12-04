import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MinusIconSmall = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#0D1217"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.5 9h-9"
    />
  </Svg>
);
export default MinusIconSmall;

import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PlusIconSmall = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#0D1217"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 4.5V9m0 0v4.5M9 9h4.5M9 9H4.5"
    />
  </Svg>
);
export default PlusIconSmall;

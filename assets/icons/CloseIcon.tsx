import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CloseIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#BABDC1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m13.5 4.5-9 9M4.5 4.5l9 9"
    />
  </Svg>
);
export default CloseIcon;

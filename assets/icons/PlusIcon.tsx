import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const PlusIcon = (props: SvgProps) => (
  <Svg width={24} height={25} fill="none" {...props}>
    <Path
      stroke="#0D1217"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.5v6m0 0v6m0-6h6m-6 0H6"
    />
  </Svg>
);
export default PlusIcon;

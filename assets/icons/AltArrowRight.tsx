import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const AltArrowRight = (props: SvgProps) => (
  <Svg width={36} height={37} fill="none" {...props}>
    <Path
      fill="#BABDC1"
      fillRule="evenodd"
      d="M12.768 7.146a1.125 1.125 0 0 1 1.586.122l9 10.5a1.125 1.125 0 0 1 0 1.464l-9 10.5a1.125 1.125 0 0 1-1.708-1.464l8.372-9.768-8.372-9.768a1.125 1.125 0 0 1 .122-1.586Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AltArrowRight;

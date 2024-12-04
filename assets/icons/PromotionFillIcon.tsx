import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const PromotionFillIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M8.33 3.333h3.34c3.151 0 4.727 0 5.705.977.674.672.884 1.626.95 3.181.013.309.019.463-.038.566-.058.103-.288.231-.748.488a1.665 1.665 0 0 0 0 2.91c.46.257.69.386.747.489.058.102.052.256.039.565-.066 1.555-.276 2.51-.95 3.181-.978.977-2.554.977-5.704.977H8.329c-3.15 0-4.726 0-5.704-.977-.674-.672-.884-1.626-.95-3.181-.012-.309-.019-.463.039-.566.057-.102.287-.23.747-.488a1.665 1.665 0 0 0 0-2.91c-.46-.257-.69-.385-.747-.488-.058-.103-.051-.257-.038-.566.065-1.555.275-2.509.949-3.181.978-.976 2.554-.976 5.704-.976Zm4.627 3.725a.624.624 0 0 1 0 .884l-5.013 5a.628.628 0 0 1-.886 0 .624.624 0 0 1 0-.884l5.012-5a.628.628 0 0 1 .887 0Zm-.861 5.859a.834.834 0 1 0 .002-1.669.834.834 0 0 0-.002 1.669ZM7.919 8.75a.834.834 0 1 0 .002-1.669.834.834 0 0 0-.002 1.67Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.667}
        x2={18.5}
        y1={3.333}
        y2={16.453}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="tomato" />
        <Stop offset={1} stopColor="#FF826C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default PromotionFillIcon;

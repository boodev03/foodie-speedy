import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const PaymentMethodFillIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M17.584 6.67c-.047-.003-.099-.003-.152-.003H15.33c-1.724 0-3.198 1.356-3.198 3.125 0 1.768 1.474 3.125 3.197 3.125H17.433c.053 0 .105 0 .152-.003a1.462 1.462 0 0 0 1.371-1.357c.004-.05.003-.104.003-.155V8.181c0-.05 0-.104-.003-.154a1.462 1.462 0 0 0-1.37-1.357Zm-2.44 3.955c.443 0 .802-.373.802-.833 0-.46-.36-.834-.803-.834-.444 0-.803.373-.803.834 0 .46.36.833.803.833Z"
      clipRule="evenodd"
    />
    <Path
      fill="url(#b)"
      fillRule="evenodd"
      d="M17.432 14.167a.184.184 0 0 1 .184.231c-.167.594-.433 1.1-.859 1.526-.623.624-1.414.9-2.391 1.032-.95.127-2.162.127-3.694.127h-1.76c-1.532 0-2.745 0-3.694-.127-.977-.132-1.768-.408-2.392-1.032-.624-.624-.9-1.415-1.032-2.391-.127-.95-.127-2.163-.127-3.694v-.094c0-1.532 0-2.745.127-3.694.132-.977.408-1.768 1.032-2.392.624-.623 1.415-.9 2.392-1.031C6.167 2.5 7.38 2.5 8.91 2.5h1.761c1.532 0 2.745 0 3.694.128.977.131 1.768.408 2.391 1.031.426.426.692.932.86 1.526a.183.183 0 0 1-.185.232h-2.104c-2.363 0-4.447 1.867-4.447 4.375 0 2.507 2.084 4.375 4.447 4.375h2.104ZM4.792 5.833a.625.625 0 0 0 0 1.25h3.333a.625.625 0 1 0 0-1.25H4.792Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={1.667}
        x2={19.819}
        y1={2.5}
        y2={15.919}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="tomato" />
        <Stop offset={1} stopColor="#FF826C" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={1.667}
        x2={19.819}
        y1={2.5}
        y2={15.919}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="tomato" />
        <Stop offset={1} stopColor="#FF826C" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default PaymentMethodFillIcon;

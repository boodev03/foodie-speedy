import Svg, { Path, SvgProps } from "react-native-svg";
const LikedIconFill = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <Path
      fill={props.fill || "#fff"}
      d="M2.5 9.637c0 4.863 4.02 7.454 6.962 9.774C10.5 20.229 11.5 21 12.5 21s2-.77 3.038-1.59c2.943-2.319 6.962-4.91 6.962-9.773 0-4.863-5.5-8.312-10-3.636-4.5-4.676-10-1.227-10 3.636Z"
    />
  </Svg>
);
export default LikedIconFill;

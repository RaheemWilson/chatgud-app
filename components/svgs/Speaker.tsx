import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";
const Speaker = (props: SvgProps) => (
  <Svg viewBox="0 0 29 29" {...props}>
    <Path fill={props.color ?? "#000"} d="M3.5 10h4l5.875-4.7A1 1 0 0 1 15 6.081V22.92a1 1 0 0 1-1.625.781L7.5 19h-4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
    <Path
      fill="none"
      stroke={props.color ?? "#000"}
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.303 9.197c1.406 1.406 2.197 3.315 2.197 5.303s-.791 3.897-2.197 5.303m2.829-13.435a11.504 11.504 0 0 1 0 16.264m-5.657-10.607a3.502 3.502 0 0 1 0 4.95"
    />
  </Svg>
);
export default Speaker;

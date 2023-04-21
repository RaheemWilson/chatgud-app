import * as React from "react";
import Svg, { G, Rect, Path, Defs, ClipPath, SvgProps } from "react-native-svg";
const Podium1 = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={162}
    fill="none"
    
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={props.width} height={113} x={-1} y={49} fill="#F89653" rx={12} />
      <Path
        fill="#FF8A5C"
        transform="translate(28, 0)"
        d={`M109 33c0-16.569 13.431-30 30-30h62c16.569 0 30 13.431 30 30v129H109V33Z`}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d={`M0 0h${props.width}v162H0z` }/>
      </ClipPath>
    </Defs>
  </Svg>
);
export default Podium1;

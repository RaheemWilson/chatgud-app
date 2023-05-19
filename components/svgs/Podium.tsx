import * as React from "react";
import Svg, { Rect, Path, type SvgProps } from "react-native-svg";
const Podium = (props: SvgProps) => (
  <Svg
    height="100%"
    width="100%"
    preserveAspectRatio="none"
    style={{
      borderWidth: 1
    }}
    {...props}
  >
    <Rect width={342} height={113} x={9} y={54} fill="#039557" rx={12} />
    <Path
      fill="#4da756"
      d="M116 38c0-16.569 13.431-30 30-30h62c16.569 0 30 13.431 30 30v129H116V38Z"
    />
  </Svg>
);
export default Podium;

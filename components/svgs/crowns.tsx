import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const Crowns = (props: SvgProps & { count: number }) => (
  <Svg width={84.12} height={15.869} {...props}>
    <G data-name="Group 10">
      <Path
        fill={props.count >= 1 ? props.color: "#d9d9de"}
        stroke={props.count >= 1 ? props.color: "#d9d9de"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m11.527.75 4.79 7.184 5.987-4.79-2.396 11.975H3.145L.75 3.145l5.987 4.79Z"
        data-name="Icon (Property 1=Crown)"
      />
      <G data-name="Icon (Property 1=Crown)">
        <Path
          fill={props.count >= 2 ? props.color: "#d9d9de"}
          stroke={props.count >= 2 ? props.color: "#d9d9de"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m42.061.75 4.79 7.184 5.987-4.79-2.396 11.975H33.679L31.284 3.145l5.987 4.79Z"
          data-name="Vector"
        />
      </G>
      <G data-name="Icon (Property 1=Crown)">
        <Path
          fill={props.count == 3 ? props.color: "#d9d9de"}
          stroke={props.count == 3 ? props.color: "#d9d9de"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m72.594.75 4.79 7.184 5.987-4.79-2.396 11.975H64.212L61.817 3.145l5.987 4.79Z"
          data-name="Vector"
        />
      </G>
    </G>
  </Svg>
);
export default Crowns;

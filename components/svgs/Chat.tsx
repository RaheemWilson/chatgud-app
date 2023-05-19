import * as React from "react";
import Svg, { SvgProps, Path, type TransformObject } from "react-native-svg";

const ChatSvg = (props: SvgProps & any) => (
  <Svg
    width={props.width ?? 180}
    height={props.width ?? 127}
    fill="none"
    {...props}
  >
    <Path
      transform={props.transform ?? [{ scale: "1, 1" }] as TransformObject}
      d="m23.202 21 131-21c11.598 0 21 9.402 21 21v76.882c0 11.598-.62 15.942-12.218 15.942L23.202 105c-11.598 0-21-9.402-21-21V41.914c0-11.598 9.402-20.914 21-20.914Z"
      fill={props.color}
    />
    <Path
      transform={props.transform ?? [{ scale: "1, 1" }] as TransformObject}
      d="m21.419 73.643 29.553 25.29S2.326 123.896 15.473 114.18c13.147-9.715 5.946-40.537 5.946-40.537Z"
      fill={props.color}
    />
  </Svg>
);

export default ChatSvg;

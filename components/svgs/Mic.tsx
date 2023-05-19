import * as React from "react";
import Svg, { SvgProps, Path, SvgXml } from "react-native-svg";



const MicSvg = (props: SvgProps) => (
  <Svg
    width={88}
    height={88}
    fill="none"
    {...props}
  >
    <Path
      d="M88 44C88 19.7 68.3 0 44 0S0 19.7 0 44s19.7 44 44 44 44-19.7 44-44Z"
      fill="#FF8A5D"
    />
    <Path
      d="M38 40.666v-8.333a6 6 0 1 1 12 0h-2a4 4 0 1 0-8 0v8.333a4 4 0 1 0 8 0h2a6 6 0 1 1-12 0Zm10 0v-8.333h2v8.333h-2Z"
      fill="#fff"
    />
    <Path
      d="M50 32.333a6 6 0 1 0-12 0v8.333a6 6 0 1 0 12 0m0-8.333h-2m2 0v8.333m-2-8.333a4 4 0 1 0-8 0v8.333a4 4 0 1 0 8 0m0-8.333v8.333m0 0h2"
      stroke="#fff"
    />
    <Path
      d="M44 51.334a10.665 10.665 0 0 0 10.666-10.667h2A12.666 12.666 0 0 1 44 53.334v-2Zm-8.957-1.71 1.415-1.414c2 2 4.713 3.124 7.542 3.124v2a12.67 12.67 0 0 1-8.957-3.71Zm-3.71-8.957h2c0 2.83 1.124 5.542 3.125 7.543l-1.415 1.414a12.667 12.667 0 0 1-3.71-8.957Zm23.333 0a1 1 0 0 1 2 0h-2Zm-23.333 0a1 1 0 0 1 2 0h-2Z"
      fill="#fff"
    />
    <Path
      d="M44 51.334a10.665 10.665 0 0 0 10.666-10.667M44 51.334v2m0-2a10.667 10.667 0 0 1-7.542-3.124m18.208-7.543h2m-2 0a1 1 0 0 1 2 0m0 0A12.666 12.666 0 0 1 44 53.334m0 0a12.67 12.67 0 0 1-8.957-3.71m0 0 1.415-1.414m-1.415 1.414a12.667 12.667 0 0 1-3.71-8.957m5.125 7.543c-2-2-3.125-4.714-3.125-7.543m-2 0h2m-2 0a1 1 0 0 1 2 0"
      stroke="#fff"
    />
    <Path
      d="M37.333 60v-2h13.333a1 1 0 0 1 0 2H37.333Zm-1-1a1 1 0 0 1 1-1v2a1 1 0 0 1-1-1Z"
      fill="#fff"
    />
    <Path
      d="M37.333 60v-2m0 2h13.333a1 1 0 0 0 0-2H37.333m0 2a1 1 0 0 1 0-2"
      stroke="#fff"
    />
    <Path
      d="M43 59v-6.667h2V59a1 1 0 0 1-2 0Zm0-6.667a1 1 0 0 1 2 0h-2Z"
      fill="#fff"
    />
    <Path
      d="M43 52.333V59a1 1 0 0 0 2 0v-6.667m-2 0h2m-2 0a1 1 0 0 1 2 0"
      stroke="#fff"
    />
  </Svg>
);

export default MicSvg;

import React from "react";
import Svg, { G, Path } from "react-native-svg";

type Props = {};

const Content = (props: Props) => {
  return (
    <Svg
      viewBox="0 0 30 30"
      width={36}
      height={36}
      {...props}
    >
      <G fill="#303c42" className="color303C42 svgShape">
        <Path
          d="M21 7H4c-1.103 0-2 .897-2 2v17c0 1.103.897 2 2 2h17c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2.5 15h-12a.5.5 0 1 1 0-1h12a.5.5 0 1 1 0 1zm0-4h-12a.5.5 0 1 1 0-1h12a.5.5 0 1 1 0 1zm0-4h-12a.5.5 0 1 1 0-1h12a.5.5 0 1 1 0 1zm9-12h-4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.086l-1.44 1.44a.5.5 0 0 0 0 .706l.707.707a.5.5 0 0 0 .708 0L26 5.414V6.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z"
          fill="#009557"
        />
      </G>
    </Svg>
  );
};

export default Content;

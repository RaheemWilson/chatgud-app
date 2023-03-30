import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {};

const Profile = (props: Props) => {
  return (
    <Svg
      viewBox="0 0 64 64"
      width={36}
      height={36}
      {...props}
    >
      <Path
        fill="#009557"
        d="M55 54a5.91 5.91 0 0 1-4.5 5.76A76.92 76.92 0 0 1 32 62a76.92 76.92 0 0 1-18.5-2.26A5.91 5.91 0 0 1 9 54a23 23 0 0 1 46 0ZM32 4a11 11 0 0 0-11 11v2a11 11 0 0 0 22 0v-2A11 11 0 0 0 32 4ZM21.72 48.88a11.69 11.69 0 0 1 3.69-4.3 2 2 0 1 0-2.31-3.27 15.72 15.72 0 0 0-5 5.78 2 2 0 0 0 .9 2.68 2 2 0 0 0 .9.21 2 2 0 0 0 1.82-1.1Z"
      />
    </Svg>
  );
};

export default Profile;

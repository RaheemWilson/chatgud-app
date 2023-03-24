import { ImageSourcePropType } from "react-native";

type ImageType = {
  [key: string]: ImageSourcePropType;
};
export const categoryImages: ImageType = {
  "high-five.png": require(`../assets/images/category/high-five.png`),
  "argument.png": require(`../assets/images/category/argument.png`),
  "drink.png": require(`../assets/images/category/drink.png`),
  "schedule.png": require(`../assets/images/category/schedule.png`),
  "trolley.png": require(`../assets/images/category/trolley.png`),
};

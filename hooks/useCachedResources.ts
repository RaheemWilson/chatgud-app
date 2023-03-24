import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Image } from "react-native";

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        const fonts = await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          // 'feather': require('../assets/fonts/feather.ttf'),
          Rubik: require("../assets/fonts/Rubik-VariableFont_wght.ttf"),
          'Rubik-Bold': require("../assets/fonts/Rubik-Bold.ttf"),
          'Rubik-SemiBold': require("../assets/fonts/Rubik-SemiBold.ttf"),
          'Rubik-ExtraBold': require("../assets/fonts/Rubik-ExtraBold.ttf"),
          'Rubik-Regular': require("../assets/fonts/Rubik-Regular.ttf"),
          'Rubik-Medium': require("../assets/fonts/Rubik-Medium.ttf"),
          'Rubik-Black': require("../assets/fonts/Rubik-Black.ttf"),
          'Rubik-Light': require("../assets/fonts/Rubik-Light.ttf"),
        });
        const images = cacheImages([
          require("../assets/images/mascot.png"),
          require("../assets/images/category/high-five.png"),
          require("../assets/images/category/drink.png"),
          require("../assets/images/category/schedule.png"),
          require("../assets/images/category/argument.png"),
          require("../assets/images/category/trolley.png"),
        ]);
        await Promise.all([fonts, ...images]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

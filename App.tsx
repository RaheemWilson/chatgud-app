import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/Auth";
import { ImageBackground, LogBox } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  LogBox.ignoreAllLogs(true);
  const mascot = require("./assets/images/splash2.png");

  if (!isLoadingComplete) {
    return <ImageBackground source={mascot} style={{ flex: 1 }}></ImageBackground>
  }

  const newColorTheme = {
    brand: {
      green: "#00A15C",
      yellow: "#FED24F",
      orange: "#FF8A5C",
      black: "#0C092A",
      gray: "#505168",
      grey: "#858494",
      mint: "#DAEFE9",
    },
  };
  const theme = extendTheme({
    colors: newColorTheme,
    fonts: {
      heading: "Rubik-Bold",
      body: "Rubik-Medium",
      mono: "Rubik-Regular",
    },
    fontConfig: {
      Rubik: {
        100: {
          normal: "Rubik-Light",
          italic: "Rubik-LightItalic",
        },
        200: {
          normal: "Rubik-Light",
          italic: "Rubik-LightItalic",
        },
        300: {
          normal: "Rubik-Light",
          italic: "Rubik-LightItalic",
        },
        400: {
          normal: "Rubik-Regular",
          italic: "Rubik-Italic",
        },
        500: {
          normal: "Rubik-Medium",
        },
        600: {
          normal: "Rubik-Medium",
          italic: "Rubik-MediumItalic",
        },
        // Add more variants
        700: {
          normal: "Rubik-Bold",
        },
        800: {
          normal: "Rubik-Bold",
          italic: "Rubik-BoldItalic",
        },
        900: {
          normal: "Rubik-Bold",
          italic: "Rubik-BoldItalic",
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar style="dark"/>
          </AuthProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

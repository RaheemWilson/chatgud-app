import * as React from "react";
import { StyleSheet, Button } from "react-native";
// import { Audio } from "expo-av";
import { Box } from "native-base";
import MicSvg from "../components/svgs/Mic";
import WebView from "react-native-webview";
import AudioPlayback from "../components/audio/AudioPlayback";
import Microphone from "../components/audio/Microphone";
import * as FileSystem from "expo-file-system";

export default function BirdChat() {
  return (
    <Box style={styles.container}>
      <AudioPlayback
        uri={FileSystem.documentDirectory + "assets/audio/A89.mp3"}
        color="#000"
      />
      <Microphone />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

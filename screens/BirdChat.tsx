import * as React from "react";
import { StyleSheet, Button } from "react-native";
// import { Audio } from "expo-av";
import { Box } from "native-base";
import MicSvg from "../components/svgs/Mic";
import WebView from "react-native-webview";

export default function BirdChat() {
  // const [recording, setRecording] = React.useState<any>();
  // const [permissionResponse, requestPermission] = Audio.usePermissions();

  // async function startRecording() {
  //   try {
  //     console.log("Requesting permissions..");
  //     await requestPermission();
  //     console.log(permissionResponse, "result");
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     console.log("Starting recording..");
  //     const { recording, status } = await Audio.Recording.createAsync(
  //       Audio.RecordingOptionsPresets.HIGH_QUALITY
  //     );
  //     console.log("status", status);
  //     setRecording(recording);
  //     console.log("Recording started");
  //   } catch (err) {
  //     console.error("Failed to start recording", err);
  //   }
  // }

  // async function stopRecording() {
  //   console.log("Stopping recording..");
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });
  //   const uri = recording.getURI();
  //   const sound = new Audio.Sound();

  //   await sound.loadAsync({
  //     uri,
  //   });

  //   await sound.playAsync();
  //   console.log("Recording stopped and stored at", uri);
  // }

  return (
    <Box style={styles.container}>
      {/* <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      /> */}
      <MicSvg />
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

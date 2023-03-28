import { Box, Text, VStack } from "native-base";
import React, { useRef, useState } from "react";
import LottieView from "lottie-react-native";
import type AnimatedLottieView from "lottie-react-native";
import { type AVPlaybackStatus, Audio } from "expo-av";
import { Pressable } from "react-native";

type Props = {};

const Microphone = (props: Props) => {
  const animation = useRef<AnimatedLottieView>(null);
  const [recording, setRecording] = useState<any>();
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      await requestPermission();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording, status } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      animation.current?.play();
      setIsRecording(true);
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    animation.current?.reset();
    setIsRecording(false);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    const sound = new Audio.Sound();

    await sound.loadAsync({
      uri,
    });

    await sound.playAsync();
  }
  return (
    <VStack alignItems={"center"}>
      <Pressable
        delayLongPress={0}
        onLongPress={async () => {
          await startRecording();
        }}
        onPressOut={async () => {
          await stopRecording();
        }}
      >
        <LottieView
          ref={animation}
          loop
          style={{
            height: 130,
            borderWidth: 1,
            backgroundColor: "transparent",
            padding: 0
          }}
          source={require("../../assets/images/lottie/microphone.json")}
          autoSize
          resizeMode="cover"
        />
      </Pressable>
      <Text fontSize={"16px"} color={"brand.orange"}>{isRecording ? "Release to stop recording" : "Hold to speak"}</Text>
    </VStack>
  );
};

export default Microphone;

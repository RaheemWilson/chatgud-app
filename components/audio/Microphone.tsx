import { Box, Text, VStack } from "native-base";
import React, { useCallback, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import type AnimatedLottieView from "lottie-react-native";
import { type AVPlaybackStatus, Audio } from "expo-av";
import { Pressable } from "react-native";
import Device from "../../constants/Layout";

type Props = {
  setSound: Function;
  onStart?: Function;
};

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
      props.onStart && props.onStart()
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
    props.setSound(uri);
  }
  return (
    <VStack alignItems={"center"} justifyContent={"center"} zIndex={1}>
      <Pressable
        delayLongPress={0}
        onLongPress={async () => {
          await startRecording();
        }}
        onPressOut={async () => {
          await stopRecording();
        }}
        style={{ overflow: "visible" }}
      >
        <LottieView
          ref={animation}
          loop
          style={{
            aspectRatio: 1.2,
            height: 120,
            width: 120,
            marginRight: -45,
            overflow: "visible",
          }}
          source={require("../../assets/images/lottie/trimmed-microphone.json")}
          resizeMode="cover"
        />
      </Pressable>
      <Text fontSize={"16px"} color={"brand.orange"}>
        {isRecording ? "Release to stop recording" : "Hold to speak"}
      </Text>
    </VStack>
  );
};

export default Microphone;

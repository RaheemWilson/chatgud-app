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

  const presets = {
    isMeteringEnabled: true,
    ios: {
      ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
    },
    android: Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
    web: Audio.RecordingOptionsPresets.HIGH_QUALITY.web,
  };
  // const recordingOptions = {
  //   android: {
  //     ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
  //     extension: ".wav",
  //   },
  //   ios: {
  //     ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
  //     extension: ".wav",
  //   },
  //   web: {
  //     ...Audio.RecordingOptionsPresets.HIGH_QUALITY.web
  //   }
  // };

  async function startRecording() {
    try {
      //TODO: modal to tell user to allow audio in phone
      await requestPermission();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording, status } =
        // Audio.RecordingOptionsPresets.HIGH_QUALITY
        await Audio.Recording.createAsync(presets);
      props.onStart && props.onStart();
      animation.current?.play();
      setIsRecording(true);
      setRecording(newRecording);
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

import React, { useRef, useState } from "react";
import { type AVPlaybackStatus, Audio } from "expo-av";
import { Box, HStack, IconButton, Text } from "native-base";
import LottieView from "lottie-react-native";
import { Pressable } from "react-native";
import type AnimatedLottieView from "lottie-react-native";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import Speaker from "../svgs/Speaker";

type Props = {
  uri: string;
};

const AudioOptionPlayback = (props: Props) => {
  const [sound, setSound] = useState<any>();
  const animation = useRef<AnimatedLottieView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0.0);

  const _onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    //@ts-ignore
    setTimeRemaining(playbackStatus?.positionMillis);
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
      }
    } else {
      if (playbackStatus.isPlaying) {
        setIsPlaying(true);
        animation.current?.play();
      } else {
        // setTimeRemaining(0.0);
        animation.current?.reset();
        setIsPlaying(false);
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        animation.current?.reset();
        // setTimeRemaining(0.0);
        setIsPlaying(false);
      }
    }
  };

  async function playSound() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    const { sound } = await Audio.Sound.createAsync(
      { uri: props.uri },
      { shouldPlay: false, progressUpdateIntervalMillis: 100 },
      _onPlaybackStatusUpdate
    );
    setSound(sound);
    await sound.playAsync();
    sound.setPositionAsync(0.0);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <IconButton
      onPress={async () => {
        !isPlaying && (await playSound());
      }}
      _pressed={{
        backgroundColor: "brand.200"
      }}
      borderColor={"gray.200"}
      variant={"outline"}
      size={"60px"}
      borderRadius={"10px"}
      icon={<Speaker color={"#505168"} width={38} height={38} />}
    />
  );
};

export default AudioOptionPlayback;

import React, { useRef, useState } from "react";
import { type AVPlaybackStatus, Audio } from "expo-av";
import { Box, HStack, IconButton, Text } from "native-base";
import LottieView from "lottie-react-native";
import { Pressable } from "react-native";
import type AnimatedLottieView from "lottie-react-native";
import { FontAwesome5, Foundation } from "@expo/vector-icons";

type Props = {
  color: string;
  uri: string;
};

const AudioPlayback = (props: Props) => {
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
      require("../../assets/audio/A89.mp3"),
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
    <HStack
      w={"285px"}
      h={"60px"}
      borderRadius={"10px"}
      bgColor={props.color}
      alignItems={"center"}
      justifyContent={"space-between"}
      space={4}
      px={2}
    >
      <IconButton
        onPress={async () => {
          !isPlaying && (await playSound());
        }}
        bg={"#fff"}
        variant={"solid"}
        size={"46px"}
        _icon={
          !isPlaying
            ? {
                as: FontAwesome5,
                name: "play",
                size: 6,
                color: props.color,
              }
            : {
                as: FontAwesome5,
                name: "pause",
                size: 6,
                color: props.color,
              }
        }
      />
      <Box zIndex={1}>
        <LottieView
          ref={animation}
          loop
          style={{
            // width: 150,
            height: 160,
            backgroundColor: "transparent",
          }}
          source={require("../../assets/images/lottie/sound.json")}
        />
      </Box>
      <Box w="60px">
        <Text color={"#fff"} fontFamily={"Rubik-Regular"}>
          {isNaN(parseFloat((timeRemaining / 60000).toFixed(2)))
            ? "0.00"
            : (timeRemaining / 60000).toFixed(2)}
        </Text>
      </Box>
    </HStack>
  );
};

export default AudioPlayback;

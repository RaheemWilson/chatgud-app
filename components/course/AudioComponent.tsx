import { Box, Text, Image, HStack } from "native-base";
import React, { useEffect, useRef } from "react";
import { Task } from "../../types/Task";
import ChatSvg from "../svgs/Chat";
import AudioPlayback from "../audio/AudioPlayback";
import { Animated, StyleSheet } from "react-native";
import Microphone from "../audio/Microphone";
import { useAuth } from "../../context/Auth";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  task: Task;
  isOpen: boolean;
  mutate: Function;
  isLoading: boolean;
};

const AudioComponent = (props: Props) => {
  const mascot = require("../../assets/images/mascot.png");
  const task = props.task;
  const [sound, setSound] = React.useState();
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (props.isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isOpen]);

  const handleSubmission = (soundUri: any) => {
    setSound(soundUri);
    props.mutate({ audio: soundUri });
  };

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        transform: [{ translateX: slideAnim }],
      }}
    >
      {!sound && (
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"}>
          <Text
            fontFamily={"body"}
            fontSize={"16px"}
            color={"#525367"}
            width={"175px"}
            textAlign={"center"}
          >
            {task.problem}
          </Text>
          <HStack mt={8} alignItems={"flex-end"}>
            <Image
              source={mascot}
              alt="ChatGud mascot"
              height={"130px"}
              width={"75px"}
            />
            <Box>
              <Box position={"relative"}>
                <ChatSvg
                  color={"#00A15C"}
                  width="230px"
                  height="140px"
                  transform={[
                    { scale: "1.2" },
                    { translateX: "30" },
                    { translateY: "10" },
                  ]}
                />
                <Box
                  position={"absolute"}
                  top={0}
                  bottom={0}
                  right={0}
                  left={0}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={"30px"}
                    fontFamily={"Rubik-Medium"}
                    textAlign={"center"}
                    alignSelf={"center"}
                    lineHeight={"34px"}
                    color="#fff"
                    textTransform={"capitalize"}
                  >
                    {task.answer.name.replace(" ", " \n ")}
                  </Text>
                </Box>
              </Box>
            </Box>
          </HStack>
          <Box mt={16} alignItems={"center"} flex={1}>
            <AudioPlayback
              uri={task.answer.media}
              color="brand.yellow"
              darkColor="#000"
              width="320px"
            />
            <Text
              fontFamily={"mono"}
              fontSize={"16px"}
              color={"#525367"}
              width={"320px"}
              alignSelf={"center"}
              textAlign={"center"}
              mt={4}
            >
              {task.answer.shortDescription}.
            </Text>
            <Box
              flex={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Microphone setSound={handleSubmission} />
            </Box>
          </Box>
        </Box>
      )}
      {sound && (
        <Box
          flex={1}
          justifyContent={"flex-start"}
          alignItems={"center"}
          position={"relative"}
          // px={8}
        >
          <Text
            fontFamily={"body"}
            fontSize={"16px"}
            color={"#525367"}
            width={"175px"}
            textAlign={"center"}
            mb="3"
          >
            YOUR ANSWER
          </Text>
          <AudioPlayback
            uri={sound}
            color="brand.green"
            darkColor="#000"
            width="320px"
          />
          <Text
            fontFamily={"body"}
            fontSize={"16px"}
            color={"#525367"}
            width={"175px"}
            textAlign={"center"}
            mt="4"
          >
            YOUR SCORE
          </Text>
          <Box>
            <Text
              fontFamily={"heading"}
              fontSize={"16px"}
              color={"brand.yellow"}
              width={"175px"}
              textAlign={"center"}
            >
              Loading ...
            </Text>
          </Box>
          <HStack
            mt={6}
            alignItems={"flex-start"}
            justifyContent={"center"}
            position={"relative"}
            space={0}
            px={4}
            // borderWidth={1}
          >
            <Image
              source={mascot}
              alt="ChatGud mascot"
              height={"280px"}
              width={"160px"}
              left={1}
              style={{ transform: [{ rotate: "340deg" }] }}
            />
            <Box bottom={4} right={1}>
              <Box position={"relative"}>
                <ChatSvg
                  color={"#00A15C"}
                  width="230px"
                  height="140px"
                  transform={[
                    { scale: "1.3" },
                    { translateX: "30" },
                    { translateY: "10" },
                  ]}
                />
                <Box
                  position={"absolute"}
                  top={0}
                  bottom={0}
                  right={0}
                  left={0}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text
                    fontSize={"30px"}
                    fontFamily={"Rubik-Medium"}
                    textAlign={"center"}
                    alignSelf={"center"}
                    lineHeight={"34px"}
                    color="#fff"
                    textTransform={"capitalize"}
                  >
                    Loading...
                  </Text>
                </Box>
              </Box>
            </Box>
          </HStack>
          <Box
            height={"auto"}
            maxHeight={"260px"}
            width={"100%"}
            borderTopRadius={20}
            marginTop={"auto"}
            bg={"brand.green"}
            position={"relative"}
            overflow={"scroll"}
            py={4}
            px={6}
          >
            {task.answer.longDescription && (
              <Box>
                <HStack alignItems={"center"} space={2}>
                  <Ionicons name={"book-outline"} size={24} color={"#FED24F"} />
                  <Text
                    fontSize={"18px"}
                    fontFamily={"Rubik-Medium"}
                    lineHeight={"34px"}
                    color="brand.yellow"
                  >
                    DEFINITION
                  </Text>
                </HStack>
                <Text
                  fontSize={"16px"}
                  fontFamily={"Rubik-Medium"}
                  lineHeight={"19px"}
                  color="#fff"
                >
                  {task.answer.longDescription}
                </Text>
              </Box>
            )}
            {task.answer.sampleSentence && (
              <Box my={2}>
                <Text
                  fontSize={"18px"}
                  fontFamily={"Rubik-Medium"}
                  lineHeight={"34px"}
                  color="brand.yellow"
                >
                  SAMPLE SENTENCE
                </Text>
                <Text
                  fontSize={"16px"}
                  fontFamily={"Rubik-Medium"}
                  lineHeight={"19px"}
                  color="#fff"
                >
                  {task.answer.sampleSentence}
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Animated.View>
  );
};

export default AudioComponent;

const styles = StyleSheet.create({
  center: {
    top: "50%",
    left: "50%",
  },
});
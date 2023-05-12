import { Box, Text, Image, HStack, Button } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../types/Task";
import ChatSvg from "../svgs/Chat";
import AudioPlayback from "../audio/AudioPlayback";
import { Animated, StyleSheet } from "react-native";
import Microphone from "../audio/Microphone";
import { useAuth } from "../../context/Auth";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Crowns from "../svgs/crowns";

type Props = {
  task: Task;
  isOpen: boolean;
  mutate: Function;
  isLoading: boolean;
  answer: number;
  setStep: Function;
};

const AudioComponent = (props: Props) => {
  const mascot = require("../../assets/images/mascot.png");
  const task = props.task;
  const [sound, setSound] = React.useState();
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [stylesResult, setStyles] = useState<any>();

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
    props.mutate({ audio: soundUri, ref: task.answer.media });
  };

  const renderResult = () => {
    const answer = props.answer;
    if (answer == 3) {
      setStyles({
        heading: "Well done",
        subheading: "Yu a gwaan gud!",
        color: "#FFD152",
        count: 3,
      });
    }

    if (answer == 2) {
      setStyles({
        heading: "Almost there",
        subheading: "Dat can gwaan!",
        color: "#50A4CC",
        count: 2,
      });
    }

    if (answer == 1) {
      setStyles({
        heading: "Not quite",
        subheading: "Just practice likkle more",
        color: "#FF8A5C",
        count: 1,
      });
    }

    if (!answer)
      setStyles({
        heading: "Loading...",
        subheading: "",
        color: "#009557",
        count: 0,
      });
  };

  useEffect(() => {
    renderResult();
  }, [props.answer]);

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
          <Box my={1}>
            <Crowns color={stylesResult.color} count={stylesResult.count} />
            {[1, 2, 0].includes(props.answer) && (
              <Button
                variant={"outline"}
                borderRadius={"50px"}
                p={1}
                my={4}
                onPress={() => {
                  props.setStep((prev: number) => prev);
                  setSound(undefined)
                }}
              >
                Try again
              </Button>
            )}
          </Box>
          <HStack
            mt={2}
            alignItems={"flex-start"}
            justifyContent={"center"}
            position={"relative"}
            space={0}
            px={4}
          >
            <Image
              source={mascot}
              alt="ChatGud mascot"
              height={"280px"}
              width={"160px"}
              left={-25}
              top={-20}
              style={{ transform: [{ rotate: "340deg" }] }}
            />
            <Box bottom={0} right={1}>
              <Box position={"relative"}>
                <ChatSvg
                  color={stylesResult.color}
                  transform={[{ scale: "1.3" }]}
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
                    fontSize={"50px"}
                    fontFamily={"Growth-Period"}
                    textAlign={"center"}
                    alignSelf={"center"}
                    lineHeight={"50px"}
                    color="#fff"
                  >
                    {stylesResult.heading}
                  </Text>
                  {stylesResult.subheading.length > 0 && (
                    <Text
                      fontSize={"20px"}
                      fontFamily={"heading"}
                      textAlign={"center"}
                      alignSelf={"center"}
                      lineHeight={"28px"}
                      color="#fff"
                      textTransform={"capitalize"}
                    >
                      {stylesResult.subheading}
                    </Text>
                  )}
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
                {task.answer.longDescription || task.answer.shortDescription}
              </Text>
            </Box>
            {task.answer.sampleSentence && (
              <Box my={2}>
                <HStack space={2} alignItems={"center"}>
                  <Fontisto name="paragraph" size={20} color={"#FED24F"} />
                  <Text
                    fontSize={"18px"}
                    fontFamily={"Rubik-Medium"}
                    lineHeight={"34px"}
                    color="brand.yellow"
                  >
                    SAMPLE SENTENCE
                  </Text>
                </HStack>
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

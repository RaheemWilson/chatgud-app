import { Box, Text, Image, HStack, VStack, Pressable } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../types/Task";
import ChatSvg from "../svgs/Chat";
import { Animated, StyleSheet } from "react-native";
import AudioOptionPlayback from "../audio/AudioOptionPlayback";

type Props = {
  task: Task;
  isOpen: boolean;
  updateCategory: Function;
  isQuiz?: boolean;
};

const AudioOptionComponent = (props: Props) => {
  const mascot = require("../../assets/images/mascot.png");
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const task = props.task;
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

  const onChange = (ans: string) => {
    setAnswer(ans);
    if (ans === task.answer.id) {
      setIsCorrect(true);
      props.updateCategory(true);
    } else {
      setIsCorrect(false);
      props.isQuiz && props.updateCategory();
    }
  };

  return (
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        paddingBottom: 40,
        transform: [{ translateX: slideAnim }],
      }}
    >
      {
        <Box flex={1} justifyContent={"flex-start"} alignItems={"center"}>
          <HStack mt={8} alignItems={"flex-end"}>
            <Image
              source={mascot}
              alt="ChatGud mascot"
              height={"130px"}
              width={"75px"}
              mr={8}
            />
            <Box>
              <Box position={"relative"}>
                <ChatSvg
                  color={"#FFD152"}
                  transform={[
                    { scale: "1.2" },
                    // { translateX: "30" },
                    // { translateY: "10" },
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
                    fontSize={"18px"}
                    fontFamily={"Rubik-Medium"}
                    textAlign={"center"}
                    alignSelf={"center"}
                    lineHeight={"24px"}
                    color="brand.gray"
                    width={"80%"}
                  >
                    {task.problem}
                  </Text>
                </Box>
              </Box>
            </Box>
          </HStack>
          {answer.length > 0 && (
            <Box mt={7}>
              <Text
                fontSize={"20px"}
                fontFamily={"Rubik-Medium"}
                textAlign={"center"}
                color={isCorrect ? "brand.green" : "red.500"}
                alignSelf={"center"}
                lineHeight={"24px"}
                width={"80%"}
              >
                {isCorrect ? "YOU ARE CORRECT 🎉" : "OOPS, WRONG ANSWER 😢"}
              </Text>
              <Text
                fontSize={"16px"}
                fontFamily={"Rubik-Medium"}
                textAlign={"center"}
                color={"brand.gray"}
                alignSelf={"center"}
                lineHeight={"24px"}
                width={"80%"}
              >
                {isCorrect || props?.isQuiz
                  ? `Correct answer: ${task.answer.name} \n ${task.answer.transcription}`
                  : "Try again!"}
              </Text>
            </Box>
          )}
          <VStack
            space={4}
            mt={6}
            width={"full"}
            alignItems={"center"}
            marginTop={"auto"}
          >
            {task.taskChoice.choices.map((choice, index) => {
              return (
                <HStack
                  key={choice.id}
                  alignItems={"center"}
                  justifyContent={"center"}
                  space={"4"}
                  mt={2}
                  width={"full"}
                >
                  <Pressable
                    borderRadius={"10px"}
                    height={"60px"}
                    width={"60%"}
                    p={2}
                    fontSize={20}
                    variant={"unstyled"}
                    display={"flex"}
                    disabled={isCorrect}
                    justifyContent={"center"}
                    onPress={() => onChange(choice.id)}
                    {...(answer === choice.id
                      ? {
                          borderColor: "brand.yellow",
                          backgroundColor: "rgba(254,210,79, 0.2)",
                          borderWidth: 2,
                        }
                      : {
                          borderColor: "gray.200",
                          borderWidth: 1,
                        })}
                  >
                    <Box>
                      <Text
                        fontSize={"16px"}
                        color={
                          answer === choice.id ? "brand.black" : "brand.gray"
                        }
                        fontFamily={"body"}
                        alignSelf={"flex-start"}
                      >
                        {`Option ${index + 1} ${isCorrect ? ": "+choice.name : ""}`}
                      </Text>
                    </Box>
                  </Pressable>
                  <AudioOptionPlayback uri={choice.media} />
                </HStack>
              );
            })}
          </VStack>
        </Box>
      }
    </Animated.View>
  );
};

export default AudioOptionComponent;

const styles = StyleSheet.create({
  center: {
    top: "50%",
    left: "50%",
  },
});

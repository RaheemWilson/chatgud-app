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

const ImageOptionComponent = (props: Props) => {
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
          <Text
            fontFamily={"body"}
            fontSize={"16px"}
            color={"#525367"}
            width={"80%"}
            textAlign={"center"}
          >
            {task.problem}
          </Text>
          <HStack mt={8} alignItems={"flex-end"}>
            <Image
              source={{ uri: task.answer.media.split(" ")[1] }}
              alt="ChatGud mascot"
              height={"130px"}
              width={"80%"}
              borderRadius={"10px"}
            />
          </HStack>
          {answer.length > 0 && (
            <Box mt={5}>
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
                        {`Option ${index + 1} ${
                          isCorrect ? ": " + choice.name : ""
                        }`}
                      </Text>
                    </Box>
                  </Pressable>
                  <AudioOptionPlayback uri={choice.media.split(" ")[0]} />
                </HStack>
              );
            })}
          </VStack>
        </Box>
      }
    </Animated.View>
  );
};

export default ImageOptionComponent;

const styles = StyleSheet.create({
  center: {
    top: "50%",
    left: "50%",
  },
});

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/Auth";
import { getCategoryTasks, getUserCategories } from "../../api/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RootStackScreenProps } from "../../types";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Progress,
  Button,
  HStack,
} from "native-base";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";
import { Task } from "../../types/Task";
import AudioComponent from "../../components/course/AudioComponent";
import {
  getEvaluation,
  updateCategoryActCompleted,
  updateQuizCompleted,
} from "../../api/Activity";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import AudioOptionComponent from "../../components/course/AudioOptionComponent";
import { getQuizTasks } from "../../api/Quiz";
import { QuizQuestion } from "../../types/Quiz";
import SoundOptionComponent from "../../components/course/SoundOptionComponent";

const QuizScreen = ({ route, navigation }: RootStackScreenProps<"Quiz">) => {
  const bg = require("../../assets/images/bg.png");
  const [step, setStep] = useState(1);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const { quizId } = route.params as any;

  const [timerCount, setTimer] = useState(120);

  const handleTimer = () =>
    setTimer((lastTimerCount) => {
      if (lastTimerCount == 0) {
        return 0;
      } else {
        return lastTimerCount - 1;
      }
    });

  const interval = setInterval(() => {
    handleTimer();
  }, 1000);
  useEffect(() => {
    timerCount === 0 && handleTimeout();
    return () => clearInterval(interval);
  }, [timerCount]);

  const handleTimeout = () => {
    clearInterval(interval);
    quizMutate({
      quizId,
      questionsCorrect,
    });
  };

  const { data: quizTasks, refetch: fetchQuizTask } = useQuery(
    ["quiz-task"],
    () => getQuizTasks(quizId),
    {
      enabled: !!quizId,
    }
  );

  const {
    data,
    mutate: quizMutate,
    isLoading,
  } = useMutation(updateQuizCompleted, {
    onSuccess: (data) => {
      navigation.navigate("QuizResult", {
        score: data.score,
        questionsCorrect: questionsCorrect,
        totalQuestions: quizTasks?.quizQuestion.length
      } as any);
    },
    onError: () => {},
  });

  const { mutate: evaluationMutate } = useMutation(getEvaluation, {
    onSuccess: (data) => {
      handleQuizUpdate();
    },
    onError: () => {},
  });

  const handleQuizUpdate = (isCorrect?: boolean) => {
    if (isCorrect) {
      setQuestionsCorrect(questionsCorrect + 1);
    }
    if (step < quizTasks?.quizQuestion?.length!) {
      setTimeout(() => {
        setStep(step + 1);
      }, 500);
    } else {
      quizMutate({
        quizId,
        questionsCorrect,
      });
    }
  };

  const renderTask = (question: QuizQuestion) => {
    // if (question.task.type === "AUDIO") {
    //   return (
    //     <AudioComponent
    //       task={question.task}
    //       isOpen={step === question.questionOrder}
    //       mutate={evaluationMutate}
    //       isLoading={isLoading}
    //     />
    //   );
    // }
    if (question.task.type === "AUDIO_OPTIONS") {
      return (
        <AudioOptionComponent
          task={question.task}
          isOpen={step === question.questionOrder}
          updateCategory={handleQuizUpdate}
          isQuiz
        />
      );
    }

    if (question.task.type === "SOUND_OPTIONS") {
      return (
        <SoundOptionComponent
          task={question.task}
          isOpen={step === question.questionOrder}
          updateCategory={handleQuizUpdate}
          audio={question.questionResource.media}
          isQuiz
        />
      );
    }

    return (
      <Box>
        <Text color={"#000"}>Unavailable</Text>
      </Box>
    );
  };
  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box flex={1} p={0} pt={`${Constants.statusBarHeight}px`} position={"relative"}>
        <HStack
          p={4}
          w="full"
          justifyContent={"space-between"}
          mt="auto"
          alignItems={"center"}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <HStack alignItems={"center"} space={1} justifyContent={"center"}>
              <Ionicons name="arrow-back-outline" size={30} color="#fff" />
              <Text
                fontFamily={"body"}
                fontSize={"16px"}
                color={"#ffffff"}
                textAlign={"center"}
              >
                Quizzes
              </Text>
            </HStack>
          </Pressable>
          <Box>
            <Text
              fontFamily={"body"}
              fontSize="20px"
              color={"#fff"}
              width={"200px"}
              textAlign={"right"}
            >
              0{Math.floor(timerCount / 60)}:
              {`${timerCount % 60}`.padStart(2, "0")}
            </Text>
          </Box>
        </HStack>
        <Box
          height={"85%"}
          width={"100%"}
          borderTopRadius={20}
          marginTop={"auto"}
          bg={"#fff"}
          position={"relative"}
          overflow={"scroll"}
          pt={6}
        >
          {quizTasks?.quizQuestion
            .sort((a, b) => a.questionOrder - b.questionOrder)
            .map((task, index) => {
              return (
                <Box
                  key={index}
                  height={"full"}
                  width={"full"}
                  display={step === task.questionOrder ? "flex" : "none"}
                >
                  {renderTask(task)}
                </Box>
              );
            })}
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default QuizScreen;

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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

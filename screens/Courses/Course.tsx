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
import { getEvaluation, updateCategoryActCompleted } from "../../api/Activity";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import AudioOptionComponent from "../../components/course/AudioOptionComponent";

const CourseScreen = ({
  route,
  navigation,
}: RootStackScreenProps<"Course">) => {
  const bg = require("../../assets/images/bg.png");
  const animatedStartValue = useRef(new Animated.Value(0)).current;
  const { completed, categoryId } = route.params as any;
  const [step, setStep] = useState(completed + 1);
  const [showNextButton, setShowNextButton] = useState(false);
  const { userData } = useAuth();

  const { data: categoryTasks, refetch: fetchCategoryTask } = useQuery(
    ["category-task"],
    () => getCategoryTasks(categoryId),
    {
      enabled: !!categoryId,
    }
  );

  const {
    data,
    mutate: categoryMutate,
    isLoading,
  } = useMutation(updateCategoryActCompleted, {
    onSuccess: () => {
      setShowNextButton(true);
    },
    onError: () => {},
  });

  const { mutate: evaluationMutate } = useMutation(getEvaluation, {
    onSuccess: (data) => {
      handleCategoryUpdate();
    },
    onError: () => {},
  });

  const handleCategoryUpdate = () => {
    categoryMutate({
      completed: step,
      proficiencyId: userData?.user.proficiencyId as string,
      categoryId: categoryId,
    });
  };

  function cycleAnimation() {
    Animated.sequence([
      Animated.timing(animatedStartValue, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedStartValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      cycleAnimation();
    });
  }

  useEffect(() => {
    showNextButton && cycleAnimation();
  }, [showNextButton]);

  useEffect(() => {
    setShowNextButton(false);
  }, [step]);

  const renderTask = (task: Task) => {
    if (task.type === "AUDIO") {
      return (
        <AudioComponent
          task={task}
          isOpen={step === task.taskOrder}
          mutate={evaluationMutate}
          isLoading={isLoading}
        />
      );
    }
    if (task.type === "AUDIO_OPTIONS") {
      return (
        <AudioOptionComponent
          task={task}
          isOpen={step === task.taskOrder}
          updateCategory={handleCategoryUpdate}
        />
      );
    }

    return <></>;
  };
  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box flex={1} p={0} pt={Constants.statusBarHeight} position={"relative"}>
        <HStack
          p={4}
          w="full"
          justifyContent={"space-between"}
          mt="auto"
          alignItems={"center"}
        >
          <Pressable onPress={() => navigation.navigate("ViewCourses")}>
            <HStack alignItems={"center"} space={1} justifyContent={"center"}>
              <Ionicons name="arrow-back-outline" size={30} color="#fff" />
              <Text
                fontFamily={"body"}
                fontSize={"16px"}
                color={"#ffffff"}
                textAlign={"center"}
              >
                Courses
              </Text>
            </HStack>
          </Pressable>
          <Box>
            {showNextButton && (
              <Button
                borderRadius={"30px"}
                backgroundColor={"brand.orange"}
                fontSize={"16px"}
                onPress={() => {
                  console.log("COURSE", step, categoryTasks?.length);
                  if (step === categoryTasks?.length) {
                    navigation.navigate("LevelCompleted", {
                      score: data?.score,
                    } as any);
                  } else {
                    setStep(step + 1);
                  }
                }}
                rightIcon={
                  <Animated.View
                    style={{
                      transform: [{ translateX: animatedStartValue }],
                    }}
                  >
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </Animated.View>
                }
              >
                <Text color={"#fff"} fontSize={"16px"}>
                  Next lesson
                </Text>
              </Button>
            )}
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
          {categoryTasks
            ?.filter((a) => a.taskOrder > completed)
            .sort((a, b) => a.taskOrder - b.taskOrder)
            .map((task, index) => {
              return (
                <Box
                  key={index}
                  height={"full"}
                  width={"full"}
                  display={step === task.taskOrder ? "flex" : "none"}
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

export default CourseScreen;

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

import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getUserCategories,
  getUserQuizzes,
} from "../../api/Category";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Progress,
  Button,
  ScrollView,
  HStack,
  Circle,
  FlatList,
  Pressable,
} from "native-base";
import { CompletedCategory } from "../../types/Category";
import Dots from "react-native-dots-pagination";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import { categoryImages } from "../../constants/CategoryImages";
import { RootStackScreenProps, RootTabScreenProps } from "../../types";
import { useAuth } from "../../context/Auth";
import { CompletedQuiz } from "../../types/Quiz";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function ViewQuizzes({
  navigation,
}: RootStackScreenProps<"ViewQuizzes">) {
  const { userData } = useAuth();
  const { data: userQuizzes, refetch: fetchQuizzes } = useQuery(
    ["user-quizzes"],
    getUserQuizzes
  );

  useRefreshOnFocus(fetchQuizzes);

  const Item = ({
    quiz,
    color,
    emoji,
    image,
  }: {
    quiz: CompletedQuiz;
    color: string;
    emoji: string;
    image: ImageSourcePropType;
  }) => {
    return (
      <Pressable
        shadow="1"
        onPress={() => {
          navigation.navigate("Quiz", {
            quizId: quiz.quiz.id,
          } as any);
        }}
      >
        {({ isPressed }) => {
          return (
            <HStack
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.99 : 1,
                  },
                ],
              }}
              background={color}
              borderRadius={"10px"}
              alignItems={"center"}
              space={4}
              p={4}
              width={"full"}
            >
              <Circle
                bg={"#fff"}
                p={2}
                borderColor={"brand.orange"}
                borderWidth={4}
                size={"70"}
              >
                <Image source={image} alt={"Category image"} size="40px" />
              </Circle>
              <VStack w="70%" space={2}>
                <Text color={"#fff"} fontSize={"18"}>
                  {quiz.quiz.category.name} Quiz {emoji}
                </Text>
                <Text color={"#fff"} fontSize={"16"} fontFamily={"mono"}>
                  Test you knowledge on what you have learnt for{" "}
                  {quiz.quiz.category.name.toLowerCase()}.
                </Text>
              </VStack>
            </HStack>
          );
        }}
      </Pressable>
    );
  };
  return (
    <Box
      pt={`${Constants.statusBarHeight + 30}px`}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      alignItems={"space-between"}
      flex={1}
      bg={"#fff"}
      p={4}
    >
      <HStack
        p={4}
        w="full"
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <HStack alignItems={"center"} space={1} justifyContent={"center"}>
            <Ionicons name="arrow-back-outline" size={30} color="#000" />
            {/* <Text
              fontFamily={"body"}
              fontSize={"16px"}
              color={"#000"}
              textAlign={"center"}
            >
              Dashboard
            </Text> */}
          </HStack>
        </Pressable>
        <Box>
          <Text
            fontFamily={"heading"}
            fontSize="20px"
            color={"#000"}
            // width={"100px"}
            textAlign={"right"}
          >
            Our Quizzes
          </Text>
        </Box>
        <Box></Box>
      </HStack>
      <VStack w={"full"} space={4}>
        {userQuizzes?.map((item, index) => {
          const colors = ["brand.yellow", "#56A4CC", "brand.green"];
          const emojis = ["🔮", "✨", "💫", "⚡️"];
          return (
            <Item
              quiz={item}
              color={colors[index % 3]}
              emoji={emojis[index % 4]}
              image={categoryImages[item.quiz.category.image]}
            />
          );
        })}
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

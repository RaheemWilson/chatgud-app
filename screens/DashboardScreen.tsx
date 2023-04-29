import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import {
  Box,
  Text,
  Image,
  HStack,
  Stack,
  VStack,
  Divider,
  ScrollView,
  Pressable,
} from "native-base";
import Constants from "expo-constants";
import { useAuth } from "../context/Auth";
import { Ionicons } from "@expo/vector-icons";
import Patty from "../components/svgs/Patty";
import Coins from "../components/svgs/Coins";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/Category";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";

export default function DashboardScreen({
  navigation,
}: RootStackScreenProps<"Overview">) {
  const bg = require("../assets/images/white-bg.png");
  const mascot = require("../assets/images/mascot.png");
  const { userData } = useAuth();

  const { data: userOverview, refetch: fetchUserOverview } = useQuery(
    ["user-data"],
    getUserData
  );

  useRefreshOnFocus(fetchUserOverview);

  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box pt={`${Constants.statusBarHeight + 30}px`} flex={1}>
        <HStack p={4} flex={1}>
          <Box flex={1}>
            <Text fontSize={"30px"} color={"brand.green"} lineHeight={"38px"}>
              {`Waa gwaan, \n${userData?.user.username}`}!
            </Text>
            <Text
              mt={3}
              fontSize={"17px"}
              fontFamily={"mono"}
              color={"brand.gray"}
            >{`Get ready to 'irie' up your \nlanguage skills!`}</Text>
            <HStack alignItems={"center"}>
              <Coins />
              <Text color={"brand.gray"} fontFamily={"body"} fontSize={"34px"}>
                {userOverview?.score ?? 0}
              </Text>
            </HStack>
          </Box>
          <Image
            source={mascot}
            alt="ChatGud mascot"
            height={"280px"}
            width={"180px"}
            position={"absolute"}
            right={-10}
            top={50}
            style={{
              transform: [{ scaleX: -1 }, { rotate: "25deg" }],
            }}
          />
        </HStack>
        <VStack
          space={6}
          width={"93%"}
          borderTopRadius={"10px"}
          borderTopColor={"gray.300"}
          pb={4}
          mx={"auto"}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            bg={"#fff"}
            borderRadius={"10px"}
            p={2}
            divider={
              <Divider
                bg="#B2DFCC"
                thickness="1"
                mx="2"
                orientation="vertical"
              />
            }
          >
            <VStack alignItems={"center"}>
              <Text color={"brand.green"} fontFamily={"body"} fontSize={"28px"}>
                {userOverview?.completedCategories ?? 0}
              </Text>
              <Text color={"#0C092A"} fontFamily={"mono"} fontSize={14}>
                {`Course${userOverview?.completedCategories! > 1 ? "s" : ""}`}
              </Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Text color={"brand.green"} fontFamily={"body"} fontSize={"28px"}>
                {userOverview?.completedChallenges ?? 0}
              </Text>
              <Text color={"#0C092A"} fontFamily={"mono"} fontSize={14}>
                {`Challenge${userOverview?.completedQuiz! > 1 ? "s" : ""}`}
              </Text>
            </VStack>
            <VStack alignItems={"center"}>
              <Text color={"brand.green"} fontFamily={"body"} fontSize={"28px"}>
                {userOverview?.completedQuiz ?? 0}
              </Text>
              <Text color={"#0C092A"} fontFamily={"mono"} fontSize={14}>
                {`Quiz${userOverview?.completedQuiz! > 1 ? "zes" : ""}`}
              </Text>
            </VStack>
          </Stack>
          <VStack mt="auto" space={4}>
            <Pressable onPress={() => navigation.navigate("DailyChallenge")}>
              <Box
                borderRadius={"12px"}
                bg={"brand.green"}
                w="full"
                height={"150px"}
              >
                <Box flex={1} py={2} px={4}>
                  <Text fontFamily={"body"} color="#fff" fontSize={"24px"}>
                    Word of the day!
                  </Text>
                  <Text
                    fontFamily={"mono"}
                    fontSize={17}
                    lineHeight={"24px"}
                    color={"#fff"}
                  >
                    {`Spice up your language skills with a daily \ndose of Jamaican patois!`}
                  </Text>
                </Box>
                <HStack
                  mt={"auto"}
                  borderBottomRadius={"12px"}
                  height={"45px"}
                  w="full"
                  bg={"rgba(0, 0, 0, 0.05)"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  py={2}
                  px={4}
                >
                  <Text fontFamily={"body"} fontSize={16} color={"#fff"}>
                    Try our daily challenge
                  </Text>
                  <Ionicons name="arrow-forward" size={24} color="#fff" />
                </HStack>
              </Box>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ViewQuizzes")}>
              <Box
                borderRadius={"12px"}
                bg={"brand.orange"}
                w="full"
                height={"150px"}
              >
                <Box flex={1} py={2} px={4}>
                  <Text fontFamily={"body"} color="#fff" fontSize={"24px"}>
                    Patois Quiz Time!
                  </Text>
                  <Text
                    fontFamily={"mono"}
                    fontSize={16}
                    lineHeight={"24px"}
                    color={"#fff"}
                  >
                    {`Test your patois knowledge with our fun \nquizzes - Challenge accepted?`}
                  </Text>
                </Box>

                <HStack
                  mt={"auto"}
                  borderBottomRadius={"12px"}
                  height={"45px"}
                  w="full"
                  bg={"rgba(0, 0, 0, 0.1)"}
                  py={2}
                  px={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Text fontFamily={"body"} fontSize={16} color={"#fff"}>
                    Take a quiz
                  </Text>
                  <Ionicons name="arrow-forward" size={24} color="#fff" />
                </HStack>
              </Box>
            </Pressable>
          </VStack>
        </VStack>
      </Box>
    </ImageBackground>
  );
}

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

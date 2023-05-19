import * as React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "native-base";
import Constants from "expo-constants";
import Device from "../constants/Layout";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/Category";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import { useState } from "react";
import { Users } from "../types/Auth";

export default function Leaderboard() {
  const bg = require("../assets/images/bg.png");
  const [topThree, setTopThree] = useState<Users[]>();
  const [otherUsers, setOtherUsers] = useState<Users[]>();

  const {
    data: users,
    isLoading,
    refetch: fetchUsers,
  } = useQuery(["users"], getUsers, {
    onSuccess: (data) => {
      const leaderboard = data;
      leaderboard.sort((a, b) => b.score - a.score);

      setTopThree([...leaderboard.slice(0, 3)]);
      setOtherUsers(leaderboard.slice(3));
    },
    onError: (data) => {},
  });

  useRefreshOnFocus(fetchUsers);

  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box
        flex={1}
        pt={`${Constants.statusBarHeight + 10}px`}
        position={"relative"}
      >
        <Text
          fontFamily={"body"}
          fontSize="24px"
          color={"#fff"}
          textAlign={"center"}
          p={6}
        >
          Leaderboard
        </Text>
        <Box
          flex={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          py={6}
          position={"relative"}
        >
          <HStack
            width={"90%"}
            height={"120px"}
            bg={"#fff"}
            borderRadius={"20px"}
            justifyContent={"space-around"}
            space={6}
          >
            <VStack
              width={`120px`}
              height={"100%"}
              position={"relative"}
              justifyContent={"center"}
            >
              {topThree?.at(1) && (
                <>
                  <Box position={"absolute"} alignSelf={"center"} top={-60}>
                    <Avatar
                      bg={"#fff"}
                      size={"80px"}
                      borderColor={"#50A4CC"}
                      borderWidth={5}
                      source={{
                        uri: `https://picsum.photos/id/${Math.floor(
                          Math.random() * 100
                        )}/80`,
                      }}
                    >
                      <Text color={"#000"} fontFamily={"heading"} fontSize={24}>
                        {"RW"}
                      </Text>
                    </Avatar>
                    <Box
                      size="20px"
                      bg="#50A4CC"
                      position={"absolute"}
                      bottom={-4}
                      left={"40%"}
                      zIndex={2}
                      borderRadius={4}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    >
                      <Text
                        alignSelf={"center"}
                        color={"#fff"}
                        style={{ transform: [{ rotate: "320deg" }] }}
                      >
                        2
                      </Text>
                    </Box>
                  </Box>
                  <Text
                    color={"#50A4CC"}
                    fontFamily={"body"}
                    fontSize={24}
                    alignSelf={"center"}
                  >
                    {topThree?.at(1)?.score ?? 0}
                  </Text>
                  <Text
                    color={"brand.gray"}
                    fontFamily={"Rubik-SemiBold"}
                    fontSize={14}
                    alignSelf={"center"}
                  >
                    @{topThree?.at(1)?.username}
                  </Text>
                </>
              )}
            </VStack>
            <VStack
              width={`120px`}
              height={"100%"}
              position={"relative"}
              justifyContent={"center"}
            >
              {topThree?.at(2) && (
                <>
                  <Box alignSelf={"center"} position={"absolute"} top={-60}>
                    <Avatar
                      bg={"#fff"}
                      size={"80px"}
                      borderColor={"brand.orange"}
                      alignSelf={"center"}
                      borderWidth={5}
                      source={{
                        uri: `https://picsum.photos/id/${Math.floor(
                          Math.random() * 100
                        )}/80`,
                      }}
                    >
                      <Text color={"#000"} fontFamily={"heading"} fontSize={24}>
                        {"RW"}
                      </Text>
                    </Avatar>
                    <Box
                      size="20px"
                      bg="brand.orange"
                      position={"absolute"}
                      bottom={-4}
                      left={"40%"}
                      zIndex={2}
                      borderRadius={4}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    >
                      <Text
                        alignSelf={"center"}
                        color={"#fff"}
                        style={{ transform: [{ rotate: "320deg" }] }}
                      >
                        3
                      </Text>
                    </Box>
                  </Box>
                  <Text
                    color={"brand.orange"}
                    fontFamily={"body"}
                    fontSize={24}
                    alignSelf={"center"}
                  >
                    {topThree?.at(2)?.score ?? 0}
                  </Text>
                  <Text
                    color={"brand.gray"}
                    fontFamily={"Rubik-SemiBold"}
                    fontSize={14}
                    alignSelf={"center"}
                  >
                    @{topThree?.at(2)?.username ?? ""}
                  </Text>
                </>
              )}
            </VStack>
          </HStack>
          <Box
            width={"122px"}
            height={"159px"}
            bg={"#fff"}
            position={"absolute"}
            bottom={6}
            borderTopRadius={"30px"}
            style={styles.shadow}
          >
            <VStack
              width={`120px`}
              height={"100%"}
              position={"relative"}
              justifyContent={"center"}
            >
              <VStack
                position={"absolute"}
                top={-90}
                alignSelf={"center"}
                alignItems={"center"}
                space={2}
              >
                <FontAwesome5 name="crown" size={28} color="#FED24F" />
                <Box>
                  <Avatar
                    bg={"#ffff"}
                    size={"80px"}
                    borderColor={"brand.yellow"}
                    borderWidth={5}
                    alignSelf={"center"}
                    source={{
                      uri: `https://picsum.photos/id/${Math.floor(
                        Math.random() * 100
                      )}/80`,
                    }}
                  >
                    <Text color={"#000"} fontFamily={"heading"} fontSize={24}>
                      {"RW"}
                    </Text>
                  </Avatar>
                  <Box
                    size="20px"
                    bg="brand.yellow"
                    position={"absolute"}
                    bottom={-4}
                    left={"40%"}
                    zIndex={2}
                    borderRadius={4}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  >
                    <Text
                      alignSelf={"center"}
                      color={"#fff"}
                      fontFamily={"heading"}
                      style={{ transform: [{ rotate: "320deg" }] }}
                    >
                      1
                    </Text>
                  </Box>
                </Box>
              </VStack>
              <Text
                color={"brand.yellow"}
                fontFamily={"body"}
                fontSize={24}
                alignSelf={"center"}
              >
                {topThree?.at(0)?.score ?? 0}
              </Text>
              <Text
                color={"brand.gray"}
                fontFamily={"Rubik-SemiBold"}
                fontSize={14}
                alignSelf={"center"}
              >
                @{topThree?.at(0)?.username}
              </Text>
            </VStack>
          </Box>
        </Box>
        <Box
          height={"55%"}
          width={"100%"}
          borderTopRadius={20}
          marginTop={"auto"}
          bg={"#fff"}
          position={"relative"}
          overflow={"visible"}
          p={6}
        >
          <FlatList
            data={otherUsers}
            ListEmptyComponent={
              <Text color={"gray.400"} textAlign={"center"}>
                There are not enough users to rank.
              </Text>
            }
            renderItem={({ item, index }) => (
              <Box
                borderBottomWidth="1"
                borderColor="gray.200"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack
                  space={[2, 3]}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="brand.gray"
                    bold
                    fontSize={"18px"}
                    px={4}
                  >
                    {index + 4}
                  </Text>

                  <Avatar
                    size="48px"
                    source={{
                      uri: `https://picsum.photos/id/${Math.floor(
                        Math.random() * 300
                      )}/80`,
                    }}
                  />
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="brand.gray"
                    bold
                    fontSize={"18px"}
                  >
                    @{item.username}
                  </Text>
                  <Spacer />
                  <Text
                    color="brand.green"
                    alignSelf="flex-start"
                    my={"auto"}
                    textAlign={"center"}
                    fontSize={"18px"}
                  >
                    {item.score} pts
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
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
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 64,
    elevation: 1,
  },
});

import * as React from "react";
import { StyleSheet, Button, ImageBackground } from "react-native";
import { Box, Text, Image, VStack, HStack, IconButton } from "native-base";
import ChatSvg from "../components/svgs/Chat";
import { EvilIcons, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { RootStackScreenProps } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDailyChallenges } from "../api/Quiz";
import AudioPlayback from "../components/audio/AudioPlayback";
import AudioOptionPlayback from "../components/audio/AudioOptionPlayback";
import { useIsFocused } from "@react-navigation/native";
import Microphone from "../components/audio/Microphone";
import Coins from "../components/svgs/Coins";
import { addChallengeCompleted, getEvaluation } from "../api/Activity";
import Crowns from "../components/svgs/crowns";

export default function DailyChallengeScreen({
  navigation,
}: RootStackScreenProps<"DailyChallenge">) {
  const bg = require("../assets/images/white-bg.png");
  const mascot = require("../assets/images/mascot.png");
  const [audio, setAudio] = React.useState("");
  const [sound, setSound] = React.useState();
  const [image, setImage] = React.useState("");
  const [answer, setAnswer] = React.useState(0);
  const [stylesResult, setStyles] = React.useState<any>();

  const { data: dailyChallenge, isLoading } = useQuery(
    ["daily-challenges"],
    () => getDailyChallenges(),
    {
      onSuccess: (data) => {
        const media = data?.problem.answer.media.split(" ") as string[];
        setAudio(media[0]);
        setImage(media[1]);
      },
      onError: (data) => {
        console.error(data);
      },
    }
  );

  const {
    data: challengeUpdate,
    mutate: challengeMutate,
    isLoading: isChallengeLoading,
  } = useMutation(addChallengeCompleted, {
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: evaluationMutate, isLoading: isEvalLoading } = useMutation(
    getEvaluation,
    {
      onSuccess: (data) => {
        setAnswer(data.prediction)
        handleChallengeUpdate(data.prediction);
      },
      onError: () => {},
    }
  );

  const handleChallengeUpdate = (evaluation: number) => {
    challengeMutate({
      evaluation: evaluation, //TODO: needs to change
      dailyChallengeId: dailyChallenge?.id as string,
    });
  };

  const renderResult = () => {
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

  React.useEffect(() => {
    renderResult();
  }, [answer]);

  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box
        flex={1}
        // bg={"#fff"}
        pt={`${Constants.statusBarHeight + 10}px`}
        position={"relative"}
      >
        <IconButton
          alignSelf={"flex-start"}
          ml={2}
          onPress={() => navigation.navigate("Overview")}
          icon={<EvilIcons name="close" size={32} color="#00A15C" />}
        />

        <HStack alignItems={"flex-start"} justifyContent={"center"} space={4}>
          <Image
            source={mascot}
            alt="ChatGud mascot"
            height={"130px"}
            width={"75px"}
            top={5}
            mr={2}
          />
          <Box>
            <Box position={"relative"}>
              <ChatSvg color={"#FF8A5C"} transform={[{ scale: "1.2" }]} />
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
                  fontSize={"40px"}
                  fontFamily={"Growth-Period"}
                  textAlign={"center"}
                  alignSelf={"center"}
                  lineHeight={"34px"}
                  color="#fff"
                  textTransform={"capitalize"}
                >
                  {`Word of the Day`}
                </Text>
                <Text
                  fontSize={"24px"}
                  fontFamily={"body"}
                  textAlign={"center"}
                  alignSelf={"center"}
                  lineHeight={"38px"}
                  color="#fff"
                  textTransform={"capitalize"}
                >
                  {dailyChallenge?.problem.answer.name}
                </Text>
              </Box>
            </Box>
          </Box>
        </HStack>
        {!sound && !isLoading && (
          <VStack
            height={"75%"}
            width={"100%"}
            borderTopRadius={20}
            marginTop={"auto"}
            bg={"#fff"}
            position={"relative"}
            overflow={"visible"}
            p={6}
            space={4}
          >
            <Image
              height={"140px"}
              width={"full"}
              source={{ uri: image }}
              alt="Patty with green background"
              borderRadius={"10px"}
            />
            <Text fontFamily={"mono"} fontSize={"16px"} color={"#525367"}>
              {dailyChallenge?.problem.answer.longDescription?.split(".")[0]}.
              Here is how it is pronounced:
            </Text>
            <Box alignSelf={"center"}>
              {audio.length > 0 && <AudioOptionPlayback uri={audio} />}
            </Box>
            <Text fontFamily={"mono"} fontSize={"16px"} color={"#525367"}>
              Now, try to pronounce the word of the day:
            </Text>
            <Microphone
              setSound={(value: any) => {
                setSound(value);
                evaluationMutate({ audio: value, ref: audio });
              }}
            />
          </VStack>
        )}
        {sound && !isEvalLoading && (
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
            pt={8}
            height={"75%"}
            width={"100%"}
            borderTopRadius={20}
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
            <VStack justifyContent={"center"} alignItems={"center"} my={4}>
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

              <Crowns color={stylesResult.color} count={stylesResult.count} />
              <Box alignItems={"center"} justifyContent={"center"} my={4}>
                <Text
                  fontSize={"50px"}
                  fontFamily={"Growth-Period"}
                  textAlign={"center"}
                  alignSelf={"center"}
                  lineHeight={"50px"}
                  color={stylesResult.color}
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
                    color={stylesResult.color}
                    textTransform={"capitalize"}
                  >
                    {stylesResult.subheading}
                  </Text>
                )}
              </Box>
              {!isChallengeLoading && (
                <HStack alignItems={"center"} mt={"1px"}>
                  <Coins />
                  <Text
                    color={"brand.orange"}
                    fontFamily={"body"}
                    fontSize={"34px"}
                  >
                    {challengeUpdate?.score}
                  </Text>
                </HStack>
              )}
            </VStack>
            <Box
              height={"auto"}
              maxHeight={"260px"}
              width={"100%"}
              position={"relative"}
              overflow={"scroll"}
              py={0}
              px={6}
              borderTopRadius={20}
            >
              {dailyChallenge?.problem.answer.sampleSentence && (
                <Box my={2}>
                  <Text
                    fontFamily={"body"}
                    fontSize={"16px"}
                    color={"#525367"}
                    lineHeight={"34px"}
                    textAlign={"center"}
                  >
                    SAMPLE SENTENCE
                  </Text>
                  <Text
                    fontSize={"16px"}
                    fontFamily={"body"}
                    lineHeight={"19px"}
                    color="brand.green"
                    textAlign={"center"}
                  >
                    {dailyChallenge?.problem.answer.sampleSentence}.
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        )}
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

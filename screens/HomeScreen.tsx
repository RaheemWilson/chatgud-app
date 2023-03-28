import { ImageBackground, StyleSheet } from "react-native";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { Box, Button, VStack, Image, Heading, Text } from "native-base";

import { useAuth } from "../context/Auth";
import { Asset, useAssets } from "expo-asset";
import ChatSvg from "../components/svgs/Chat";
import Layout from "../constants/Layout";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  const img = require("../assets/images/mascot.png");
  const bg = require("../assets/images/bg.png");

  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box flex={1} p={0} position={"relative"}>
        <Box right={"-180px"} top={130} width={"100%"} position={"absolute"}>
          <Box>
            <ChatSvg color={"#fff"} />
            <Text
              fontSize={"19px"}
              style={styles.mediumText}
              position={"absolute"}
              textAlign={"center"}
              top={"30%"}
              left={"15px"}
              color={"brand.black"}
            >
              {"Hi, I'm Patty, \n Your Patois Pal!"}
            </Text>
          </Box>
        </Box>
        <Box
          background={"#fff"}
          borderRadius={"40px"}
          height={"60%"}
          marginTop={"auto"}
          borderStyle={"solid"}
          position={"relative"}
          overflow={"visible"}
        >
          <Image
            source={img}
            alt="ChatGud mascot"
            height={"350px"}
            width={"210px"}
            position={"absolute"}
            top={-250}
            left={-20}
          />
          <VStack alignItems={"center"} space={4} px={6} mt={20}>
            <Heading color={"#525367"} fontSize={"36px"}>
              👋🏾
            </Heading>
            <Heading color={"#525367"} style={{ fontWeight: "bold" }}>
              Welcome to ChatGud
            </Heading>
            <Box>
              <Text
                fontSize={"16px"}
                textAlign={"center"}
                fontFamily={"Rubik"}
                color={"brand.grey"}
                style={styles.mediumText}
              >
                Waah Gwaan!
              </Text>
              <Text
                fontSize={"16px"}
                fontFamily={"Rubik"}
                textAlign={"center"}
                color={"brand.grey"}
                lineHeight={"24px"}
                style={styles.mediumText}
              >
                {
                  "Let's get you started on your journey to speaking patois like yuh bawn ah yaad!"
                }
              </Text>
            </Box>
            <Button
              marginTop={"50px"}
              width={"100%"}
              borderRadius={"30px"}
              backgroundColor={"brand.yellow"}
              height={"50px"}
              onPress={() => navigation.navigate("Onboarding")}
            >
              <Text
                color={"brand.gray"}
                fontSize={"16px"}
                style={styles.mediumText}
              >
                GET STARTED
              </Text>
            </Button>
            <Button
              width={"100%"}
              borderRadius={"30px"}
              backgroundColor={"brand.mint"}
              height={"50px"}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                color={"#009557"}
                fontSize={"16px"}
                style={styles.mediumText}
              >
                I ALREADY HAVE AN ACCOUNT
              </Text>
            </Button>
          </VStack>
        </Box>
      </Box>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  mediumText: {
    fontWeight: "600",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

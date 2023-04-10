import * as React from "react";
import { StyleSheet, Button, ImageBackground } from "react-native";
// import { Audio } from "expo-av";
import { Box, Text, Image, VStack } from "native-base";
import MicSvg from "../components/svgs/Mic";
import WebView from "react-native-webview";
import AudioPlayback from "../components/audio/AudioPlayback";
import Microphone from "../components/audio/Microphone";
import * as FileSystem from "expo-file-system";
import ChatSvg from "../components/svgs/Chat";

export default function BirdChat() {
  const bg = require("../assets/images/bg.png");
  const mascot = require("../assets/images/mascot.png");
  const [sound, setSound] = React.useState();
  const [translation, setTranslation] = React.useState("");
  // FileSystem.documentDirectory + "assets/audio/A89.mp3"

  return (
    <ImageBackground source={bg} style={styles.image}>
      <Box flex={1} p={0} position={"relative"}>
        <Box top={140} width={"100%"} position={"absolute"}>
          <Box right={"-180px"}>
            <ChatSvg
              color={"#fff"}
              transform={[
                { scale: "1.3" },
                { translateX: "30" },
                { translateY: "10" },
              ]}
            />
            <Text
              fontSize={"19px"}
              fontFamily={"Rubik-Medium"}
              position={"absolute"}
              textAlign={"center"}
              top={"12%"}
              left={"30px"}
              color={"brand.gray"}
            >
              {
                "Try our \n AI Speech-To-Text  \nfor Jamaican Patois \n translation!"
              }
            </Text>
          </Box>
          <Image
            source={mascot}
            alt="ChatGud mascot"
            height={"280px"}
            width={"180px"}
            position={"absolute"}
            top={-60}
            left={0}
          />
        </Box>
        <Box
          height={"60%"}
          width={"100%"}
          borderTopRadius={20}
          marginTop={"auto"}
          bg={"#fff"}
          position={"relative"}
          overflow={"visible"}
          p={6}
        >
          <VStack flex={1} space={4}>
            {sound && (
              <>
                <Box alignSelf={"flex-end"}>
                  <AudioPlayback
                    uri={sound}
                    color="brand.green"
                    darkColor={"#0000"}
                  />
                </Box>
                <Box
                  w={"285px"}
                  minH={"60px"}
                  borderRadius={"10px"}
                  bgColor={"brand.orange"}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                  px={4}
                  py={2}
                >
                  <Text fontSize={18} color={"#fff"} lineHeight={"24"}>
                    {translation === "" ? "Loading..." : translation}
                  </Text>
                  <Text
                    fontSize={12}
                    textAlign={"right"}
                    width={"full"}
                    color={"rgba(255, 255, 255, 0.6)"}
                  >
                    {translation && "Confidence: 12%"}
                  </Text>
                </Box>
              </>
            )}
            {!sound && (
              <Box>
                <Text
                  color={"brand.grey"}
                  fontFamily={"mono"}
                  textAlign={"center"}
                  fontSize={16}
                >
                  Record an audio of a Jamaican patois word or phrase and watch
                  our AI translates your speech.
                </Text>
              </Box>
            )}

            <Box marginTop={"auto"}>
              <Microphone
                setSound={(value: any) => {
                  setSound(value);
                  setTimeout(() => {
                    setTranslation("Wah gwan, me deh yah wah sleep");
                  }, 5000);
                }}
                onStart={() => {
                  setSound(undefined);
                  setTranslation("");
                }}
              />
            </Box>
          </VStack>
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
});

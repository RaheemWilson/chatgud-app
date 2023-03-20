import { SafeAreaView, StyleSheet } from "react-native";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { Box, Button, VStack, Image, Heading, Text } from "native-base";

import { useAuth } from "../context/Auth";
import { Asset, useAssets } from "expo-asset";
import ChatSvg from "../components/svgs/Chat";

export default function WelcomeScreen({
  navigation,
}: RootStackScreenProps<"Welcome">) {
  const img = require("../assets/images/mascot.png");
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Box flex={1} p={4} position={"relative"}>
        <VStack
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
          space={3}
        >
          <Image
            source={img}
            alt="ChatGud mascot"
            height={"350px"}
            width={"210px"}
          />
          <Heading color={"#525367"} fontSize={"36px"}>
            Welcome 👋🏾
          </Heading>
          <Text
            fontSize={"16px"}
            textAlign={"center"}
            fontFamily={"Rubik"}
            color={"brand.grey"}
            style={styles.mediumText}
          >
            Your profile has been created successfully!
          </Text>
        </VStack>
        <Button
          marginTop={"auto"}
          borderColor={"gray.200"}
          borderRadius={"30px"}
          height={"54px"}
          mt={2}
          w="full"
          background={"brand.green"}
          // onPress={() => navigation.navigate("Dashboard")}
          onPress={() => signOut()}
        >
          <Text fontSize={16} color={"#fff"} style={styles.mediumText}>
            CONTINUE TO HOME
          </Text>
        </Button>
      </Box>
    </SafeAreaView>
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
});

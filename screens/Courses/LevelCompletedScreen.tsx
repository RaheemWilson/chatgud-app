import { SafeAreaView, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../../types";
import { Box, Button, VStack, Image, Heading, Text, HStack } from "native-base";
import Coins from "../../components/svgs/Coins";

export default function LevelCompletedScreen({
  navigation,
  route,
}: RootStackScreenProps<"LevelCompleted">) {
  const img = require("../../assets/images/mascot.png");
  const { score } = route.params as any;
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
            style={{ transform: [{ rotate: "350deg" }] }}
          />
          <Heading color={"#525367"} fontSize={"36px"}>
            Hooray! 🥳
          </Heading>
          <Text
            fontSize={"16px"}
            textAlign={"center"}
            fontFamily={"Rubik"}
            color={"brand.grey"}
            style={styles.mediumText}
          >
            Your have completed this course successfully!
          </Text>
          <HStack alignItems={"center"} mt={"8px"}>
            <Coins />
            <Text color={"brand.orange"} fontFamily={"body"} fontSize={"34px"}>
              {score}
            </Text>
          </HStack>
        </VStack>
        <VStack space={3}>
          <Button
            marginTop={"auto"}
            borderColor={"gray.200"}
            borderRadius={"30px"}
            height={"54px"}
            mt={2}
            w="full"
            background={"brand.yellow"}
            onPress={() => navigation.navigate("Courses")}
          >
            <Text fontSize={16} color={"brand.gray"} style={styles.mediumText}>
              Continue learning
            </Text>
          </Button>
          <Button
            width={"100%"}
            borderRadius={"30px"}
            backgroundColor={"brand.mint"}
            height={"50px"}
            color={"brand.green"}
            onPress={() => navigation.navigate("ViewQuizzes")}
          >
            <Text fontSize={16} color={"brand.green"} style={styles.mediumText}>
              Take one of our quizzes!
            </Text>
          </Button>
        </VStack>
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

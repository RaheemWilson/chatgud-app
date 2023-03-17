import { StyleSheet } from "react-native";
import { RootStackParamList, RootStackScreenProps } from "../types";
import { View, Text } from "../components/Themed";
import { Box, Button, VStack } from "native-base";

export default function HomeScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  return (
    <VStack
      justifyContent={"center"}
      alignItems={"center"}
      borderColor={"black"}
      flex={1}
      p={2}
    >
      <Text style={styles.title}>chatgud</Text>
      <Button marginTop={"auto"} width={"100%"}>Get Started</Button>
      <Button width={"100%"} variant={"outline"}>
        Have an account already
      </Button>
    </VStack>
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
});

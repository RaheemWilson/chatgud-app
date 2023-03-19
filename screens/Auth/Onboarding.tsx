import { SafeAreaView, StyleSheet } from "react-native";
import { RootStackParamList, RootStackScreenProps } from "../../types";
import {
  Box,
  Button,
  VStack,
  Image,
  Heading,
  Text,
  HStack,
  Icon,
  Progress,
  IconButton,
} from "native-base";

import { Asset, useAssets } from "expo-asset";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ChatSvg from "../../components/svgs/Chat";

export default function OnboardingScreen({
  navigation,
}: RootStackScreenProps<"Home">) {
  const [step, setStep] = useState(0);
  const methods = useForm();
  const [assets, error] = useAssets([
    require("../../assets/images/mascot.png"),
  ]);
  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <VStack flex={1} p={2} bgColor={"#fff"}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              icon={
                <Icon
                  as={AntDesign}
                  name="arrowleft"
                  size={"28px"}
                  color={"gray.400"}
                />
              }
            />
            <Box w="80%" maxW="400">
              <Progress
                value={45}
                mx="4"
                _filledTrack={{
                  bg: "brand.green",
                }}
              />
            </Box>
            <Box size={"30px"}></Box>
          </HStack>
          <HStack position={"relative"} alignItems={"center"} justifyContent={"center"}>
            {assets && (
              <Image
                source={{ uri: assets[0].uri }}
                alt="ChatGud mascot"
                height={"200px"}
                width={"120px"}
                top={10}
              />
            )}
            <Box>
              <ChatSvg color={"#00A15C"} height={400} />
            </Box>
          </HStack>
        </VStack>
      </SafeAreaView>
    </FormProvider>
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

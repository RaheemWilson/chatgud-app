import { SafeAreaView, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../../types";
import { Box, HStack, Icon, Progress, IconButton, Slide } from "native-base";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import StepOne from "../../components/steps/StepOne";
import StepThree from "../../components/steps/StepThree";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateUser } from "../../types/Auth";
import StepTwo from "../../components/steps/StepTwo";

const schema = z.object({
  email: z.string().email(),
  age: z.string(),
  password: z.string().min(8),
  username: z.string(),
  nationality: z.string(),
  proficiency: z.string(),
});

export default function OnboardingScreen({
  navigation,
}: RootStackScreenProps<"Onboarding">) {
  const [step, setStep] = useState(1);
  const methods = useForm<CreateUser>({
    defaultValues: {
      age: "",
      nationality: "JM",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const img = require("../../assets/images/mascot.png");

  const handlePress = () => {
    if (step == 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Box flex={1} py={2} px={2} bgColor={"#fff"}>
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
              onPress={handlePress}
            />
            <Box w="80%" maxW="400">
              <Progress
                value={(step / 3) * 100}
                mx="4"
                _filledTrack={{
                  bg: "brand.green",
                }}
              />
            </Box>
            <Box size={"30px"}></Box>
          </HStack>
          {step === 1 && (
            <StepOne
              onPress={() => {
                setStep(step + 1);
              }}
              assets={img}
            />
          )}
          {step === 2 && (
            <StepTwo
              assets={img}
              onPress={() => {
                setStep(step + 1);
              }}
            />
          )}
          {step === 3 && <StepThree assets={img} navigation={navigation} />}
        </Box>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 28,
  },
  mediumText: {
    fontWeight: "600",
  },
});

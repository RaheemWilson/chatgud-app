import { SafeAreaView, StyleSheet } from "react-native";
import { RootStackScreenProps } from "../../types";
import {
  Box,
  HStack,
  Icon,
  Progress,
  IconButton,
  Image,
  Text,
  FormControl,
  VStack,
  Divider,
  Button,
  useToast,
} from "native-base";

import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import StepOne from "../../components/steps/StepOne";
import StepThree from "../../components/steps/StepThree";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreateUser } from "../../types/Auth";
import StepTwo from "../../components/steps/StepTwo";
import ChatSvg from "../../components/svgs/Chat";
import InputBox from "../../components/input/Input";
import { useAuth } from "../../context/Auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const methods = useForm<CreateUser>({
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  const img = require("../../assets/images/mascot.png");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Box flex={1} py={2} px={4} bgColor={"#fff"}>
          <HStack alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton
              icon={
                <Icon
                  as={AntDesign}
                  name="arrowleft"
                  size={"28px"}
                  color={"gray.400"}
                />
              }
              onPress={() => navigation.navigate("Home")}
            />
          </HStack>
          <HStack
            // position={"relative"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            space={5}
          >
            <Image
              source={img}
              alt="ChatGud mascot"
              height={"200px"}
              width={"120px"}
              top={8}
            />
            <Box position={"relative"}>
              <ChatSvg color={"#00A15C"} />
              <Text
                fontSize={"19px"}
                style={styles.mediumText}
                position={"absolute"}
                textAlign={"center"}
                top={"30px"}
                left={"15px"}
                color={"#fff"}
              >
                {"Wah gwan, Welcome back!"}
              </Text>
            </Box>
          </HStack>
          <Divider mt={12} mx={"auto"} width={"100%"} bg={"gray.200"} />
          <VStack space={6} mt={6}>
            <Box>
              <FormControl isInvalid={Boolean(errors.email)} isRequired>
                <FormControl.Label>
                  <Text
                    fontSize={"18px"}
                    color={"brand.black"}
                    style={styles.mediumText}
                  >
                    Email address
                  </Text>
                </FormControl.Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <InputBox
                        onChange={onChange}
                        value={value}
                        placeholder="Your email address"
                        type={"text"}
                        keyboardType={"email-address"}
                      />
                    );
                  }}
                />
                <FormControl.ErrorMessage>
                  <Text style={styles.inValid}>
                    That's an invalid email there.
                  </Text>
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={Boolean(errors.password)} isRequired>
                <FormControl.Label>
                  <Text
                    fontSize={"18px"}
                    color={"brand.black"}
                    style={styles.mediumText}
                  >
                    Password
                  </Text>
                </FormControl.Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <InputBox
                        onChange={onChange}
                        value={value}
                        placeholder="Your password"
                        type={"password"}
                      />
                    );
                  }}
                />
              </FormControl>
            </Box>
          </VStack>
          <Button
            marginTop={"auto"}
            borderColor={"gray.200"}
            borderRadius={"30px"}
            height={"60px"}
            mt={2}
            py={2}
            px={4}
            fontSize={20}
            background={"brand.green"}
            onPress={handleSubmit(async (data) => {
              try {
                console.log(data);
                setIsLoading(true);
                await signIn(data);
                navigation.navigate("Welcome");
              } catch (error) {
                toast.show({
                  title: "Error",
                  description: `There was an error trying to sign you in`,
                  duration: 5000,
                  colorScheme: "green",
                });
              }
              setIsLoading(false);
            })}
            isLoading={isLoading}
          >
            <Text fontSize={20} color={"#fff"} style={styles.mediumText}>
              Continue
            </Text>
          </Button>
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
  inValid: {
    fontWeight: "500",
    fontSize: 14,
  },
});

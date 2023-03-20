import {
  Box,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  HStack,
  Divider,
  Image,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import ChatSvg from "../svgs/Chat";
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "../../types/Auth";
import { useAuth } from "../../context/Auth";

type Props = {
  assets: any;
  navigation: any
};

const InputBox = ({
  value,
  onChange,
  placeholder,
  type,
  ...props
}: {
  value: any;
  placeholder: string;
  onChange: () => void;
  type: "text" | "password";
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <Input
      value={value}
      onChangeText={onChange}
      type={type}
      borderWidth={"1"}
      borderColor={"gray.200"}
      borderRadius={"18px"}
      height={"60px"}
      mt={2}
      py={2}
      px={4}
      fontSize={20}
      placeholder={placeholder}
      variant={"unstyled"}
      _focus={{
        borderColor: "brand.green",
      }}
      {...props}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

const StepThree = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const toast = useToast();
  const { registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <HStack
        // position={"relative"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        space={5}
      >
        {props.assets && (
          <Image
            source={props.assets}
            alt="ChatGud mascot"
            height={"200px"}
            width={"120px"}
            top={8}
          />
        )}
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
            {"Yayy, let's get \n you registered!"}
          </Text>
        </Box>
      </HStack>
      <Divider mt={12} mx={"auto"} width={"95%"} bg={"gray.200"} />
      <Box flex={1} px={3}>
        <VStack space={6} mt={4}>
          <Box>
            <FormControl isInvalid={Boolean(errors.username)} isRequired>
              <FormControl.Label>
                <Text
                  fontSize={"18px"}
                  color={"brand.black"}
                  style={styles.mediumText}
                >
                  Enter a username
                </Text>
              </FormControl.Label>
              <Controller
                name="username"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <InputBox
                      onChange={onChange}
                      value={value}
                      placeholder="Your username"
                      type={"text"}
                    />
                  );
                }}
              />
              <FormControl.ErrorMessage>
                <Text style={styles.inValid}>
                  Create a username that can be used when learning.
                </Text>
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl isInvalid={Boolean(errors.email)} isRequired>
              <FormControl.Label>
                <Text
                  fontSize={"18px"}
                  color={"brand.black"}
                  style={styles.mediumText}
                >
                  Enter your email
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
                  Enter a valid email for when you need to sign in again.
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
                  Create a password
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
              <FormControl.ErrorMessage>
                <Text style={styles.inValid}>
                  Password should be 8 characters are more
                </Text>
              </FormControl.ErrorMessage>
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
              setIsLoading(true)
              await registerUser(data as CreateUser);
              props.navigation.navigate('Welcome')
            } catch (error) {
              toast.show({
                title: "Error",
                description: `There was an error creating your account`,
                duration: 5000,
                colorScheme: "green",
              });
            }
            setIsLoading(false)
          })}
          isLoading={isLoading}
        >
          <Text fontSize={20} color={"#fff"} style={styles.mediumText}>
            Continue
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  mediumText: {
    fontWeight: "600",
  },
  inValid: {
    fontWeight: "500",
    fontSize: 14,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Box, FormControl, Input, VStack, Text, Button } from "native-base";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import InputBox from "../components/input/Input";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/Auth";
import { UpdateUser } from "../types/Auth";
import { RootStackScreenProps } from "../types";

export default function EditProfileScreen({
  navigation,
}: RootStackScreenProps<"EditProfile">) {
  const {
    control,
    trigger,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUser>();

  const { updateUser, userData } = useAuth();

  useEffect(() => {
    const { user } = userData!;
    setValue("age", `${user.age}`);
    setValue("nationality", user.nationality);
    setValue("username", user.username);
  }, [userData]);

  const { mutate, isLoading } = useMutation(
    async (user: UpdateUser) => await updateUser(user),
    {
      onSuccess: () => {
        navigation.goBack();
      },
    }
  );

  return (
    <Box style={styles.container} p={4}>
      <VStack space={6} mt={4} flex={1} w="full" pb={6}>
        <FormControl isInvalid={Boolean(errors.username)} isRequired>
          <FormControl.Label>
            <Text fontSize={"18px"} color={"brand.black"} fontFamily={"mono"}>
              Username
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
        <Box>
          <FormControl>
            <FormControl.Label>
              <Text fontSize={"18px"} color={"brand.black"} fontFamily={"mono"}>
                Where are you from?
              </Text>
            </FormControl.Label>
            <Controller
              name="nationality"
              defaultValue={"JM"}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Box
                    borderWidth={"1"}
                    borderColor={"gray.200"}
                    borderRadius={"18px"}
                    height={"60px"}
                    mt={2}
                    py={2}
                    px={4}
                  >
                    <CountryPicker
                      countryCode={value as CountryCode}
                      withCountryNameButton
                      withFlag
                      withFilter
                      theme={{
                        fontFamily: "Rubik-Regular",
                        fontSize: 18,
                      }}
                      withEmoji={false}
                      onSelect={(country) => {
                        onChange(country.cca2);
                      }}
                    />
                  </Box>
                );
              }}
            />
          </FormControl>
        </Box>
        <Box>
          <Controller
            name="age"
            control={control}
            render={({ field: { onChange, value, ref, ...field } }) => {
              return (
                <FormControl isInvalid={"age" in errors} isRequired>
                  <FormControl.Label>
                    <Text
                      fontSize={"18px"}
                      color={"brand.black"}
                      fontFamily={"mono"}
                    >
                      How old are you?
                    </Text>
                  </FormControl.Label>
                  <Input
                    {...field}
                    value={value}
                    onChangeText={(text) => {
                      onChange(text);
                    }}
                    type="text"
                    borderWidth={"1"}
                    borderColor={"gray.200"}
                    borderRadius={"18px"}
                    height={"60px"}
                    mt={2}
                    py={2}
                    px={4}
                    keyboardType={"numeric"}
                    fontSize={20}
                    placeholder="Your age"
                    variant={"unstyled"}
                    _focus={{
                      borderColor: "brand.green",
                    }}
                    ref={ref}
                  />
                  <FormControl.ErrorMessage>
                    <Text style={styles.inValid}>
                      Let us know your age before you continue.
                    </Text>
                  </FormControl.ErrorMessage>
                </FormControl>
              );
            }}
          />
        </Box>

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
          onPress={handleSubmit((data) => {
            mutate(data);
          })}
          isLoading={isLoading}
        >
          <Text fontSize={20} color={"#fff"} fontFamily={"body"}>
            Update profile
          </Text>
        </Button>
      </VStack>
    </Box>
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
  inValid: {
    fontWeight: "500",
    fontSize: 14,
  },
});

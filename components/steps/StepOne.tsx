import {
  Box,
  VStack,
  FormControl,
  // Input,
  Button,
  Text,
  HStack,
  Divider,
  Image,
  Input,
} from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import ChatSvg from "../svgs/Chat";

type Props = {
  onPress: () => void;
  assets: any;
};

const StepOne = (props: Props) => {
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const values = watch();
  return (
    <>
      <HStack alignItems={"flex-start"} justifyContent={"center"} space={5}>
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
            {"Tell us more \n about yourself."}
          </Text>
        </Box>
      </HStack>
      <Divider mt={12} mx={"auto"} width={"95%"} bg={"gray.200"} />
      <Box flex={1} px={3}>
        <VStack space={6} mt={4}>
          <Box>
            <FormControl>
              <FormControl.Label>
                <Text
                  fontSize={"18px"}
                  color={"brand.black"}
                  style={styles.mediumText}
                >
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
                        countryCode={value}
                        withCountryNameButton
                        withFlag
                        withFilter
                        theme={{
                          fontFamily: "Rubik",
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
                        style={styles.mediumText}
                      >
                        How old are you?
                      </Text>
                    </FormControl.Label>
                    <Input
                      {...field}
                      value={value}
                      onChangeText={(text) => {
                        // trigger('age')
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
                      keyboardType={'numeric'}
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
          onPress={async () => {
            const result = await trigger("age");
            if (result) {
              props.onPress();
            }
          }}
        >
          <Text fontSize={20} color={"#fff"} style={styles.mediumText}>
            Continue
          </Text>
        </Button>
      </Box>
    </>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  mediumText: {
    fontWeight: "600",
  },
  inValid: {
    fontWeight: "500",
    fontSize: 14,
  },
});

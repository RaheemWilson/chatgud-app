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
  Pressable,
} from "native-base";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import ChatSvg from "../svgs/Chat";
import { useQuery } from "@tanstack/react-query";
import { getProficiency } from "../../api/Proficiency";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  assets: any;
};

const StepTwo = (props: Props) => {
  const {
    control,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const values = watch();
  const { data, isLoading } = useQuery(["preference"], getProficiency);
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
            fontSize={"18px"}
            style={styles.mediumText}
            position={"absolute"}
            textAlign={"center"}
            top={"20px"}
            left={"2px"}
            color={"#fff"}
          >
            {"How much \n Jamaican patois do you know?"}
          </Text>
        </Box>
      </HStack>
      <Divider mt={12} mx={"auto"} width={"95%"} bg={"gray.200"} />
      <Box flex={1} px={3}>
        <Box>
          <FormControl>
            <Controller
              name="proficiency"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <VStack space={4} mt={6}>
                    {data
                      ?.sort((a, b) => a.preferenceOrder - b.preferenceOrder)
                      .map((level) => {
                        return (
                          <Pressable
                            borderRadius={"18px"}
                            height={"80px"}
                            mt={2}
                            py={2}
                            px={4}
                            fontSize={20}
                            variant={"unstyled"}
                            onPress={() => onChange(level.id)}
                            {...(value === level.id
                              ? {
                                  borderColor: "brand.yellow",
                                  backgroundColor: "rgba(254,210,79, 0.2)",
                                  // color: "brand.black",
                                  borderWidth: 2
                                }
                              : {
                                  borderColor: "gray.200",
                                  borderWidth: 1
                                })}
                          >
                            <HStack
                              flex={1}
                              alignItems={"center"}
                              space={2}
                            >
                              <HStack>
                                {Array(level.preferenceOrder)
                                  .fill(0)
                                  .map(() => {
                                    return (
                                      <AntDesign
                                        name="star"
                                        size={18}
                                        color="rgba(254,210,79, 1)"
                                      />
                                    );
                                  })}
                                {Array(data.length + 1 - level.preferenceOrder)
                                  .fill(0)
                                  .map(() => {
                                    return (
                                      <AntDesign
                                        name="staro"
                                        size={18}
                                        color="rgba(254,210,79, 1)"
                                      />
                                    );
                                  })}
                              </HStack>
                              <Text
                                fontSize={"18px"}
                                color={value === level.id ? "brand.black" : "brand.gray"}
                                style={styles.mediumText}
                                flex={1}
                                flexWrap={"wrap"}
                              >
                                {level.description}
                              </Text>
                            </HStack>
                          </Pressable>
                        );
                      })}
                  </VStack>
                );
              }}
            />
             <FormControl.ErrorMessage>
                <Text style={styles.inValid}>
                  Please select a preference before you continue.
                </Text>
              </FormControl.ErrorMessage>
          </FormControl>
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
          onPress={async () => {
            const result = await trigger("proficiency");
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

export default StepTwo;

const styles = StyleSheet.create({
  mediumText: {
    fontWeight: "600",
  },
  inValid: {
    fontWeight: "500",
    fontSize: 14,
  },
});

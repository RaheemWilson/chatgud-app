import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getUserCategories } from "../../api/Category";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Progress,
  Button,
} from "native-base";
import { CompletedCategory } from "../../types/Category";
import Dots from "react-native-dots-pagination";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import { categoryImages } from "../../constants/CategoryImages";
import { RootStackScreenProps, RootTabScreenProps } from "../../types";

export default function ViewCourses({
  navigation,
}: RootStackScreenProps<"ViewCourses">) {
  const { data: userCategories, refetch: fetchUserCategories } = useQuery(
    ["user-categories"],
    getUserCategories
  );

  const [activeSlide, setActiveSlide] = useState(0);
  useRefreshOnFocus(fetchUserCategories);

  const width = Dimensions.get("window").width;
  const bg = require("../../assets/images/white-bg.png");

  const Item = ({
    category,
    image,
  }: {
    category: CompletedCategory;
    image: ImageSourcePropType;
  }) => {
    return (
      <Box
        background={"transparent"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={4}
        flex={1}
      >
        <Box justifyContent={"center"} flex={1}>
          <Image source={image} alt={category.category.name} size="225" />
        </Box>
        <VStack
          bgColor={"brand.green"}
          borderRadius={`20px`}
          height={"320px"}
          width={"90%"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          space={4}
          p={4}
        >
          <Heading fontFamily={"Rubik-Medium"} fontSize={"24px"} color={"#fff"}>
            {`Course: ${category.category.name}`}
          </Heading>
          <Box w="100%" mb={6}>
            <Text
              fontFamily={"Rubik-Medium"}
              textAlign={"center"}
              py={2}
              fontSize={"16px"}
              color={"rgba(255, 255, 255, 0.8)"}
            >
              <Text fontSize={"20px"} color={"#fff"}>
                {category.completed}
              </Text>
              {`/${category.category.totalActivites}`} UNITS
            </Text>
            <Progress
              value={
                (category.completed / category.category.totalActivites) * 100
              }
              mx="4"
              height={"15px"}
              _filledTrack={{
                bg: "brand.yellow",
              }}
            />
          </Box>
          <Text textAlign={"center"} color={"#fff"} style={styles.title}>
            {category.category.description} blah blah blah blah blah blah blah
          </Text>
          <Button
            marginTop={"auto"}
            borderColor={"gray.200"}
            borderRadius={"30px"}
            height={"60px"}
            mt={2}
            py={2}
            px={4}
            fontSize={20}
            w={"full"}
            background={"brand.yellow"}
            onPress={() =>
              navigation.navigate("Course", {
                completed: category.completed,
                categoryId: category.categoryId,
              } as any)
            }
          >
            <Text fontSize={20} color={"#fff"}>
              {category.completed > 0 ? "Continue learning" : "Start learning"}
            </Text>
          </Button>
        </VStack>
      </Box>
    );
  };
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
      alignItems={"space-between"}
      flex={1}
    >
      <Box flex={0.97}>
        <Carousel
          // loop={false}
          width={width}
          autoPlay={false}
          defaultIndex={0}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.97,
            parallaxAdjacentItemScale: 0.9,
            parallaxScrollingOffset: 65,
          }}
          data={
            userCategories?.sort(
              (a, b) => a.category.categoryOrder - b.category.categoryOrder
            ) ?? []
          }
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ index, item }) => {
            return (
              <Item
                category={item}
                image={categoryImages[item.category.image]}
              />
            );
          }}
        />
      </Box>
      <Box
        w={"full"}
        flex={0.1}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Dots length={5} active={activeSlide} activeColor={"#00A15C"} />
      </Box>
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
    fontWeight: "900",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

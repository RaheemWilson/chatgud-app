import {
  Dimensions,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/Category";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import {
  Box,
  Text,
  Image,
  Heading,
  VStack,
  Progress,
  Button,
} from "native-base";
import { Category } from "../types/Category";
import Dots from "react-native-dots-pagination";
import Carousel from "react-native-reanimated-carousel";
import { useState } from "react";
import { categoryImages } from "../constants/CategoryImages";

export default function Courses() {
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery(["preference"], getCategories);
  const [activeSlide, setActiveSlide] = useState(0);
  useRefreshOnFocus(refetch);
  const width = Dimensions.get("window").width;

  const Item = ({
    category,
    image,
  }: {
    category: Category;
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
          <Image source={image} alt={category.name} size="225" />
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
            {`Course: ${category.name}`}
          </Heading>
          <Box w="100%" mb={6}>
            <Text fontFamily={"Rubik-Medium"} textAlign={"center"} py={1}>
              2 / 8 UNITS
            </Text>
            <Progress
              value={(1 / 3) * 100}
              mx="4"
              height={"15px"}
              _filledTrack={{
                bg: "brand.yellow",
              }}
            />
          </Box>
          <Text textAlign={"center"} color={"#fff"} style={styles.title}>
            {category.description} blah blah blah blah blah blah blah
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
            // onPress={}
          >
            <Text fontSize={20} color={"#fff"}>
              Continue
            </Text>
          </Button>
        </VStack>
      </Box>
    );
  };
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"space-between"}
      alignItems={"space-between"}
      flex={1}
      bg={"#fff"}
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
            parallaxScrollingOffset: 65
          }}
          data={
            categories?.sort((a, b) => a.categoryOrder - b.categoryOrder) ?? []
          }
          onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ index, item }) => {
            return <Item category={item} image={categoryImages[item.image]} />;
          }}
        />
      </Box>
      <Box w={"full"} flex={0.1} alignItems={"center"} justifyContent={"center"}>
        <Dots length={5} active={activeSlide} activeColor={"#00A15C"} />
      </Box>
    </Box>
    // </SafeAreaView>
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
});

import { StyleSheet } from "react-native";

import {
  Avatar,
  Box,
  VStack,
  Text,
  Divider,
  Button,
  Pressable,
  HStack,
  Badge,
} from "native-base";
import { useAuth } from "../context/Auth";
import { format, parseISO } from "date-fns";
import Profile from "../components/svgs/Profile";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Content from "../components/svgs/Content";
import { RootStackScreenProps } from "../types";
import CountryFlag from "react-native-country-flag";

export default function ProfileScreen({
  navigation,
}: RootStackScreenProps<"Profile">) {
  const { userData, signOut } = useAuth();
  const { user } = userData!;
  return (
    <Box style={styles.container} bg={"#fff"} py={8} px={4}>
      <VStack alignItems={"center"} space={4} h="90%" w="full">
        <Avatar
          bg={"brand.orange"}
          size={"xl"}
          source={{
            uri: `https://picsum.photos/id/${Math.floor(
              Math.random() * 100
            )}/80`,
          }}
        >
          <Text color={"#fff"} fontFamily={"Rubik-SemiBold"} fontSize={36}>
            {"RW"}
          </Text>
        </Avatar>
        <Box alignItems={"center"}>
          <Badge colorScheme="success" variant={"solid"}>
            {user.proficiency.name.toUpperCase()}
          </Badge>
          <HStack alignItems={"center"} space={2}>
            <Text
              fontSize={18}
              color={"brand.gray"}
              fontFamily={"Rubik-Medium"}
            >
              ~{user.username}
            </Text>
          </HStack>
          <Text fontSize={18} color={"brand.gray"} fontFamily={"Rubik-Medium"} mb={2}>
            {user.email}
          </Text>
          <CountryFlag isoCode={user.nationality.toLowerCase()} size={20} />
          <Text fontSize={14} fontFamily={"mono"} color={"brand.grey"} mt={2}>
            Joined on{" "}
            {format(parseISO(user.dateCreated as string), `MMM dd, yyyy`)}
          </Text>
        </Box>
        <Divider mx="auto" bg={"gray.200"} mt={5} />
        <VStack w="full" divider={<Divider mx="auto" bg={"gray.200"} mt={5} />}>
          <Pressable onPress={() => navigation.navigate("EditProfile")}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack space={3} alignItems={"center"}>
                <Profile />
                <Text color={"brand.gray"} fontSize={"18px"}>
                  Edit Profile
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={24} color="#505168" />
            </HStack>
          </Pressable>
          <Pressable py={2}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack space={5} alignItems={"center"}>
                <Content />
                <Text color={"brand.gray"} fontSize={"18px"}>
                  Learn More
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={24} color="#505168" />
            </HStack>
          </Pressable>
          <Pressable py={2}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack space={5} alignItems={"center"}>
                <Content />
                <Text color={"brand.gray"} fontSize={"18px"}>
                  Privacy Policy
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={24} color="#505168" />
            </HStack>
          </Pressable>
          <Pressable py={2}>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <HStack space={5} alignItems={"center"}>
                <Content />
                <Text color={"brand.gray"} fontSize={"18px"}>
                  Frequently Asked Questions
                </Text>
              </HStack>
              <Ionicons name="chevron-forward" size={24} color="#505168" />
            </HStack>
          </Pressable>
        </VStack>
        <Button
          marginTop={"auto"}
          borderColor={"brand.green"}
          borderRadius={"30px"}
          borderWidth={2}
          height={"60px"}
          mt={2}
          py={2}
          px={4}
          fontSize={20}
          width={"full"}
          // bg={"brand.mint"}
          color={"brand.green"}
          variant={"unstyle"}
          onPress={async () => await signOut()}
          _pressed={{
            backgroundColor: "brand.mint",
          }}
        >
          <Text fontSize={20} color={"brand.green"}>
            Sign out
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
    justifyContent: "flex-end",
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
});

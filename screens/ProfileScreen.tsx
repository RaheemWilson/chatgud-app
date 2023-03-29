import { StyleSheet } from "react-native";

import { Avatar, Box, VStack, Text, Divider, Button } from "native-base";
import { useAuth } from "../context/Auth";
import { format, parseISO } from "date-fns";

export default function ProfileScreen() {
  const { userData, signOut } = useAuth();
  const { user } = userData!;
  console.log(JSON.stringify(userData, null, 2));
  return (
    <Box style={styles.container} bg={"#fff"} py={8} px={4}>
      <VStack alignItems={"center"} space={4} flex={1} w={"full"}>
        <Avatar bg={"brand.green"} size={"xl"}>
          <Text color={"#fff"} fontFamily={"Rubik-SemiBold"} fontSize={36}>
            {"RW"}
          </Text>
        </Avatar>
        <Box alignItems={"center"}>
          <Text fontSize={18} color={"brand.gray"} fontFamily={"Rubik-Medium"}>
            @{user.username}
          </Text>
          <Text fontSize={18} color={"brand.gray"} fontFamily={"Rubik-Medium"}>
            {user.email}
          </Text>
          <Text fontSize={14} fontFamily={"mono"} color={"brand.grey"} mt={2}>
            Joined on{" "}
            {format(parseISO(user.dateCreated as string), `MMM dd, yyyy`)}
          </Text>
        </Box>
        <Divider w="90%" mx="auto" bg={"gray.200"} mt={5} />
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
          color={"brand.green"}
          variant={"outline"}
          onPress={async () => await signOut()}
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
});

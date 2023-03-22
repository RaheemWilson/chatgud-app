import { Input } from "native-base";
import { KeyboardTypeOptions } from "react-native";

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

export default InputBox;

import { Input as NativeInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mt={4}>
      <NativeInput
        bg="gray_7"
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray_2"
        fontFamily="body"
        placeholderTextColor="gray_4"
        rounded="md"
        isInvalid={invalid}
        py={3}
        _invalid={{
          borderWidth: 1,
          borderColor: "red_light",
        }}
        _focus={{
          borderWidth: 1,
          bg: "gray_7",
          borderColor: "gray_3",
        }}
        {...rest}
      />

      <FormControl.ErrorMessage mt={0.5}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

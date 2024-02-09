import { Button as NativeButton, IButtonProps, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";

type ButtonProps = IButtonProps & {
  title: string;
  textColor?: ColorType;
  buttonColor?: ColorType;
  icon?: string;
}

export function Button({
  title,
  textColor = "gray.600",
  buttonColor = "gray.300",
  icon,
  ...rest
}: ButtonProps) {
  return (
    <NativeButton bg={buttonColor} rounded="md" h={12} {...rest}>
      <Text color={textColor} fontSize="sm" fontWeight="bold">
        {title}
      </Text>
    </NativeButton>
  );
}

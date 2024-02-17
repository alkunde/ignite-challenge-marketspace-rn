import { Button as NativeButton, IButtonProps, Icon, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { Plus, WhatsappLogo } from "phosphor-react-native";

type ButtonProps = IButtonProps & {
  title: string;
  textColor?: ColorType;
  buttonColor?: ColorType;
  icon: "add" | "whatsapp" | null;
}

export function Button({
  title,
  textColor = "gray_2",
  buttonColor = "gray_5",
  icon,
  ...rest
}: ButtonProps) {
  return (
    <NativeButton
      _pressed={{ bg: "gray_7" }}
      bg={buttonColor}
      rounded="md"
      h={12}
      leftIcon={icon === 'add' ? <Icon as={<Plus />} size={4} /> : icon === 'whatsapp' ? <Icon as={<WhatsappLogo />} size={4} /> : undefined}
      {...rest}
    >
      <Text color={textColor} fontSize="sm" fontFamily="heading">
        {title}
      </Text>
    </NativeButton>
  );
}

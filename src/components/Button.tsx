import { Button as NativeButton, IButtonProps, Icon, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { ArrowLeft, Plus, Tag, WhatsappLogo } from "phosphor-react-native";

type ButtonProps = IButtonProps & {
  title: string;
  textColor?: ColorType;
  buttonColor?: ColorType;
  icon?: "add" | "whatsapp" | "tag" | "back" | null;
}

export function Button({
  title,
  textColor = "gray_2",
  buttonColor = "gray_5",
  icon = null,
  ...rest
}: ButtonProps) {
  return (
    <NativeButton
      bg={buttonColor}
      rounded="md"
      h={12}
      leftIcon={
        icon === 'add'
          ? <Icon as={<Plus size={16} />} color={textColor} />
          : icon === 'whatsapp'
            ? <Icon as={<WhatsappLogo size={16} />} color={textColor} />
            : icon === 'tag'
              ? <Icon as={<Tag size={16} />} color={textColor} />
              : icon === 'back'
                ? <Icon as={<ArrowLeft size={16} />} color={textColor} />
                : undefined
      }
      _pressed={{ bg: "gray_7" }}
      {...rest}
    >
      <Text color={textColor} fontSize="sm" fontFamily="heading">
        {title}
      </Text>
    </NativeButton>
  );
}

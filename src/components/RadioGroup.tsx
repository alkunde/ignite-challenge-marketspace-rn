import { HStack, IRadioGroupProps, Radio } from "native-base";

type Props = IRadioGroupProps & {
  options: {
    value: string;
    text: string;
  }[];
}

export function RadioGroup({ options, ...rest}: Props) {
  return (
    <Radio.Group {...rest}>
      <HStack space={5}>
        {options.map((item) => (
          <Radio
            key={item.value}
            value={item.value}
            _text={{
              fontFamily: "body",
              fontSize: "md",
              color: "gray_2",
            }}
            _checked={{
              borderColor: "blue_light",
              _icon: { color: "blue_light" },
            }}
            _pressed={{
              borderColor: "blue_dark",
              _icon: { color: "blue_dark" },
            }}
          >
            {item.text}
          </Radio>
        ))}
      </HStack>
    </Radio.Group>
  );
}

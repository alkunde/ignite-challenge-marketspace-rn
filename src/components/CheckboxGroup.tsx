import { Checkbox, ICheckboxGroupProps } from "native-base";

type Props = ICheckboxGroupProps & {
  options: {
    value: string;
    text: string;
  }[];
}

export function CheckboxGroup({ options, ...rest }: Props) {
  return (
    <Checkbox.Group mb={6} {...rest}>
      {options.map((item) => (
        <Checkbox
          key={item.value}
          value={item.value}
          _text={{
            fontFamily: "body",
            fontSize: "md",
            color: "gray_2",
          }}
          _checked={{
            bg: "blue_light",
            borderColor: "blue_light",
            _pressed: { bg: "blue_dark", borderColor: "blue_dark" }
          }}
          _pressed={{
            borderColor: "blue_dark",
          }}
        >
          {item.text}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}

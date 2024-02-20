import { Box, Center, Text } from "native-base";

type Props = {
  title: string;
}

export function Tag({ title }: Props) {
  return (
    <Box bg={title === 'novo' ? "blue_dark" : "gray_5"} rounded="full" px={3} py={1}>
      <Text fontFamily="heading" fontSize="2xs" color={title === 'novo' ? "white" : "gray_2"} textTransform="uppercase">
        {title}
      </Text>
    </Box>
  );
}

import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center flex={1} bg="gray_6">
      <Spinner color="blue_light" />
    </Center>
  );
}

import { Header } from "@components/Header";
import { VStack } from "native-base";

export function MyAdvertises() {
  return (
    <VStack flex={1} safeAreaTop p={6}>
      <Header title="Meus anúncios" showAddButton={true} />

    </VStack>
  );
}

import { Header } from "@components/Header";
import { Box, ScrollView, Text, VStack } from "native-base";

export function NewAdvertise() {
  return (
    <VStack flex={1} safeAreaTop p={6}>
      <Header title="Criar anúncio" showBackButton={true} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text fontFamily="heading" fontSize="md" color="gray_2" pt={6}>
          Imagens
        </Text>

        <Text fontFamily="body" fontSize="sm" color="gray_3">
          Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={true} mt={6}>
          <Box bg="gray_5" rounded="md" size="100" />
        </ScrollView>
      </ScrollView>
    </VStack>
  );
}

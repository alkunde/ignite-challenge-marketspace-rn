import { HStack, Text, VStack } from "native-base";

export function Item() {
  return (
    <VStack>
      <Text>
        Tenis vermelho
      </Text>

      <HStack>
        <Text>R$ </Text>

        <Text>
          59,90
        </Text>
      </HStack>
    </VStack>
  );
}

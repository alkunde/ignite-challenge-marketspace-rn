import { Button, HStack, Icon, Text, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";

export function InfoAdvertises() {
  return (
    <HStack bg="blue_alpha" justifyContent="space-between" alignItems="center" rounded="md" p={4} mt={3}>
      <HStack alignItems="center">
        <Icon
          as={<Tag size={22} />}
          color="blue_dark"
        />

        <VStack ml={4}>
          <Text fontFamily="heading" fontSize="xl" color="gray_2">
            4
          </Text>

          <Text fontFamily="body" fontSize="xs" color="gray_2">
            anúncios ativos
          </Text>
        </VStack>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center">
        <Text fontFamily="heading" fontSize="xs" color="blue_dark">
          Meus anúncios
        </Text>
        <Icon as={<ArrowRight size={16} />} color="blue_dark" ml={2} />
      </HStack>
    </HStack>
  );
}

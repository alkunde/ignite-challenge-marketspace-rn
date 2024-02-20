import { Box, Center, HStack, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Tag } from "@components/Tag";

type Props = {
  name: string;
  description: string;
  price: number;
}

export function PreviewAdvertise({ name, description, price }: Props) {
  const navigation = useNavigation();

  async function handlePublish() {

  }

  return (
    <VStack flex={1}>
      <Center bg="blue_light" safeAreaTop p={6}>
        <Text fontFamily="heading" fontSize="md" color="gray_7" textAlign="center">
          Pré visualização do anúncio
        </Text>

        <Text fontFamily="body" fontSize="sm" color="gray_7" textAlign="center">
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

      <VStack flex={1} justifyContent="space-between">
        <ScrollView>
          <Box w="full" h="280" bg="red_light" />

          <VStack p={6}>
            <Tag title="usado" />

            <HStack justifyContent="space-between" alignItems="center" mt={2}>
              <Text fontFamily="heading" fontSize="xl" color="gray_1">
                Luminária pendente
              </Text>

              <HStack alignItems="baseline">
                <Text fontFamily="heading" fontSize="sm" color="blue_light">
                  R$
                </Text>

                <Text fontFamily="heading" fontSize="xl" color="blue_light" ml={1}>
                  48,50
                </Text>
              </HStack>
            </HStack>

            <Text mt={1}>
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus.
            </Text>

            <HStack alignItems="center" mt={4}>
              <Text fontFamily="heading" fontSize="sm" color="gray_2">
                Aceita troca?
              </Text>

              <Text fontFamily="body" fontSize="sm" color="gray_2" ml={2}>
                Não
              </Text>
            </HStack>

            <Text fontFamily="heading" fontSize="sm" color="gray_2" mt={4}>
              Meios de pagamento:
            </Text>
          </VStack>
        </ScrollView>

        <HStack alignItems="center" space={4} bg="gray_7" p={6}>
          <Button
            flex={1}
            title="Voltar e editar"
            icon="back"
            onPress={navigation.goBack}
          />

          <Button
            flex={1}
            title="Publicar"
            buttonColor="blue_light"
            textColor="gray_6"
            icon="tag"
            onPress={handlePublish}
          />
        </HStack>
      </VStack>
    </VStack>
  );
}

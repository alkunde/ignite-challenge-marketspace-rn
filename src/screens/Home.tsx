import { Circle, HStack, Image, Input, ScrollView, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";

import { AppNavigatorRouteProps } from "@routes/app.routes";
import { InfoAdvertises } from "@components/InfoAdvertises";
import { useEffect } from "react";
import { api } from "@services/api";

export function Home() {
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRouteProps>();

  function handleNewAdvertise() {
    navigation.navigate("new_advertise");
  }

  useEffect(() => {
    async function getProducts() {
      console.log(`${api.defaults.baseURL}/images/${user.avatar}`);
      const response = await api.get("/products");
    }

    getProducts();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      p={6}
    >
      <HStack safeAreaTop w="full" alignItems="center" justifyContent="space-between">
        <HStack>
          <Image
            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
            size="45"
            borderColor="blue_light"
            borderWidth={2}
            rounded="full"
            overflow="hidden"
            alt="Foto de perfil"
          />

          <VStack ml={2}>
            <Text fontFamily="body" fontSize="md" color="gray_1">
              Boas vindas,
            </Text>

            <Text fontFamily="heading" fontSize="md" color="gray_1">
              {user.name}!
            </Text>
          </VStack>
        </HStack>

        <Button
          title="Criar anúncio"
          buttonColor="black"
          textColor="gray_7"
          icon="add"
          h="42"
          onPress={handleNewAdvertise}
        />
      </HStack>

      <Text fontFamily="body" fontSize="sm" color="gray_3" mt={6}>
        Seus produtos anunciados para venda
      </Text>

      <InfoAdvertises />

      <Text fontFamily="body" fontSize="sm" color="gray_3" mt={6}>
        Compre produtos variados
      </Text>

      <Input mt={2} bg="gray_7" borderWidth={0} />
    </ScrollView>
  );
}

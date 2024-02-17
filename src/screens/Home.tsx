import { Circle, HStack, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";

import { AppNavigatorRouteProps } from "@routes/app.routes";

export function Home() {
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRouteProps>();

  function handleNewAdvertise() {
    navigation.navigate("new_advertise");
  }

  return (
    <VStack flex={1} bg="gray_6" safeAreaTop pt={6} px={6}>
      <HStack w="full" alignItems="center" justifyContent="space-between">
        <HStack>
          <Circle size="45" borderColor="blue_light" borderWidth={2}>

          </Circle>

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
    </VStack>
  );
}

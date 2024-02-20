import { HStack, ScrollView, Switch, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { CheckboxGroup } from "@components/CheckboxGroup";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { ImageSelector } from "@components/ImageSelector";
import { RadioGroup } from "@components/RadioGroup";

import { AppNavigatorRouteProps } from "@routes/app.routes";

export function NewAdvertise() {
  const navigation = useNavigation<AppNavigatorRouteProps>();

  function handlePressCancel() {
    navigation.goBack();
  }

  async function handlePressConfirm() {
    // navigation.navigate("preview_advertise");
  }

  return (
    <VStack flex={1}safeAreaTop>
      <Header title="Criar anúncio" showBackButton={true} p={6} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack px={6}>
          <Text fontFamily="heading" fontSize="md" color="gray_2">
            Imagens
          </Text>

          <Text fontFamily="body" fontSize="sm" color="gray_3">
            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
          </Text>

          <ImageSelector />

          <Text fontFamily="heading" fontSize="md" color="gray_2" mt={6}>
            Sobre o produto
          </Text>

          <Input
            placeholder="Título do anúncio"
          />

          <Input
            placeholder="Descrição do produto"
            multiline
            h={40}
            mb={4}
          />

          <RadioGroup
            name="isNewOrUsed"
            options={[
              { value: "novo", text: "Produto novo" },
              { value: "usado", text: "Produto usado" },
            ]}
          />

          <Text fontFamily="heading" fontSize="md" color="gray_2" mt={4}>
            Venda
          </Text>

          <Input
            placeholder="Valor do produto"
          />

          <Text fontFamily="heading" fontSize="md" color="gray_2" mt={4}>
            Aceita troca?
          </Text>

          <Switch mt={2} onTrackColor="blue_light" />

          <Text fontFamily="heading" fontSize="md" color="gray_2" mt={4}>
            Meios de pagamento
          </Text>

          <CheckboxGroup
            options={[
              { value: "boleto", text: "Boleto" },
              { value: "pix", text: "Pix" },
              { value: "dinheiro", text: "Dinheiro" },
              { value: "credito", text: "Cartão de Crédito" },
              { value: "deposito", text: "Depósito Bancário" },
            ]}
          />

        </VStack>

        <HStack alignItems="center" space={4} bg="gray_7" p={6}>
          <Button
            flex={1}
            title="Cancelar"
            onPress={handlePressCancel}
          />

          <Button
            flex={1}
            title="Avançar"
            buttonColor="gray_1"
            textColor="gray_7"
            onPress={handlePressConfirm}
          />
        </HStack>
      </ScrollView>
    </VStack>
  );
}

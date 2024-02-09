import { Center, Image, Input, Text, VStack } from "native-base";

import Logo from '@assets/logo.png';
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <VStack flex={1} bg="white">
      <VStack h="80%" bg="gray.200" roundedBottom="2xl">
        <Center mt={20} mb={16}>
          <Image
            source={Logo}
            alt="Logo do marketspace"
          />
        </Center>

        <VStack mx={12}>
          <Text textAlign="center" fontFamily="body" fontSize="sm">
            Acesse sua conta
          </Text>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            mt={5}
            fontFamily="body"
            fontSize="md"
            bg="gray_7"
            color="gray_2"
            placeholderTextColor="gray_4"
            borderWidth={0}
            rounded="lg"
            px={4}
            py={3}
            _focus={{
              borderWidth: 1,
              bg: "gray_7",
              borderColor: "gray_3"
            }}
          />

          <Input
            placeholder="Senha"
            secureTextEntry
            mt={5}
            fontFamily="body"
            fontSize="md"
            bg="gray_7"
            color="gray_2"
            placeholderTextColor="gray_4"
            borderWidth={0}
            rounded="lg"
            px={4}
            py={3}
            _focus={{
              borderWidth: 1,
              bg: "gray_7",
              borderColor: "gray_3"
            }}
          />

          <Button
            title="Entrar"
            mt={10}
            buttonColor="blue_light"
            textColor="white"
          />
        </VStack>
      </VStack>

      <VStack h="20%" bg="white" justifyContent="center" mx={12}>
        <Text fontFamily="body" fontSize="sm" color="gray_2" textAlign="center" mb={4}>
          Ainda não tem acesso?
        </Text>

        <Button title="Criar uma conta" />
      </VStack>
    </VStack>
  );
}

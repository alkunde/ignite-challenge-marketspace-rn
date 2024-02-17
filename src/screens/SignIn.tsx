import { useState } from "react";
import { Center, Icon, Image, Pressable, Text, VStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeSlash } from "phosphor-react-native";

import Logo from '@assets/logo.png';

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { useAuth } from "@hooks/useAuth";

import { AuthNavigatorRouteProps } from "@routes/auth.routes";

import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
});

export function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRouteProps>();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signInSchema)
  });

  function handleNewAccountNavigation() {
    navigation.navigate("signup");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch(error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde";
      toast.show({
        title,
        bgColor: "red_light"
      });

      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="white">
      <VStack h="80%" bg="gray_6" roundedBottom="2xl">
        <Center mt={20} mb={16}>
          <Image
            source={Logo}
            alt="Logo do marketspace"
          />
        </Center>

        <VStack mx={12}>
          <Text textAlign="center" fontFamily="body" fontSize="sm" color="gray_2">
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                onChangeText={onChange}
                InputRightElement={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      as={showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                      mr={2}
                    />
                  </Pressable>
                }
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Entrar"
            isLoading={isLoading}
            mt={8}
            buttonColor="blue_light"
            textColor="white"
            onPress={handleSubmit(handleSignIn)}
          />
        </VStack>
      </VStack>

      <VStack h="20%" bg="white" justifyContent="center" mx={12}>
        <Text fontFamily="body" fontSize="sm" color="gray_2" textAlign="center" mb={4}>
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar uma conta"
          isDisabled={isLoading}
          onPress={handleNewAccountNavigation}
        />
      </VStack>
    </VStack>
  );
}

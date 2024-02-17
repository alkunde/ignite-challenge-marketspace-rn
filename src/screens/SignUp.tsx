import { useState } from "react";
import { Center, Circle, HStack, Icon, Pressable, ScrollView, Text, VStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import { Eye, EyeSlash, User, PencilSimpleLine } from "phosphor-react-native";

import Logo from '@assets/logo.svg';

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { useAuth } from "@hooks/useAuth";

import { AuthNavigatorRouteProps } from "@routes/auth.routes";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";
import { TouchableOpacity } from "react-native";

type UserImageSelectedProps = {
  selected: boolean;
  photo: {
    uri: string;
    name: string;
    type: string;
  };
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  phone: yup.string().required('Informe o número do telefone'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'A confirmação de senha não confere'),
});

export function SignUp() {
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRouteProps>();
  const toast = useToast();

  const userForm = new FormData();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState({ selected: false } as UserImageSelectedProps);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleUserPhotoSelect() {
    try {
      setPhotoLoading(true);

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa image é muito grande",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();
        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserPhoto({
          selected: true,
          photo: { ...photoFile },
        });
      }
    } catch(error) {
      toast.show({
        title: "Ocorreu um problema ao selecionar a foto",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setPhotoLoading(false);
    }
  }

  async function handleSignUp({ name, email, phone, password }: FormData) {
    try {
      if (!userPhoto.selected) {
        return toast.show({
          title: "Selecione uma foto",
          placement: "top",
          bgColor: "red.500",
        });
      }

      setIsLoading(true);

      const userImage = {
        ...userPhoto.photo,
        name: `${name}.${userPhoto.photo.name}`.toLowerCase(),
      };

      console.log(userImage);
      userForm.append("avatar", userImage);
      userForm.append("name", name);
      userForm.append("email", email);
      userForm.append("tel", phone);
      userForm.append("password", password);

      await api.post("/users", userForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await signIn(email, password);
    } catch(error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde";
      toast.show({
        title,
        bgColor: "red_light",
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bg="gray_6"
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} safeArea mb={10}>

      <Center mt={3}>
        <Logo />
      </Center>

      <VStack mx={12} mt={2}>
        <Text textAlign="center" fontFamily="heading" fontSize="xl" color="gray_1">
          Boas vindas!
        </Text>

        <Text textAlign="center" fontFamily="body" fontSize="sm" color="gray_2" lineHeight="sm" mt={2}>
          Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
        </Text>

        <HStack mt={8} alignItems="center" justifyContent="center" mb={2}>
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Circle h="88" w="88" bg="gray_5" borderWidth={4} borderColor="blue_light">
              <Icon as={<User size={45} weight="bold" />} color="gray_4" />
            </Circle>
          </TouchableOpacity>

          <Circle size={10} bg="blue_light" ml={-8} mt={12}>
            <Icon as={<PencilSimpleLine size={16} />} color="gray_6" />
          </Circle>
        </HStack>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nome"
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

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
          name="phone"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={onChange}
              errorMessage={errors.phone?.message}
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
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    mr={2}
                  />
                </Pressable>
              }
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Confirmar senha"
              type={showConfirmPassword ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    as={showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    mr={2}
                  />
                </Pressable>
              }
              onChangeText={onChange}
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />

        <Button
          title="Criar"
          mt={5}
          buttonColor="black"
          textColor="white"
          isLoading={isLoading}
          onPress={handleSubmit(handleSignUp)}
        />

        <Text fontFamily="body" fontSize="sm" color="gray_2" textAlign="center" mb={4} mt={12}>
          Já tem uma conta?
        </Text>

        <Button title="Ir para o login" onPress={handleGoBack} isDisabled={isLoading} />
      </VStack>

      </VStack>
    </ScrollView>
  );
}

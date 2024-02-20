import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, Icon, Image, Pressable, ScrollView, useToast } from "native-base";
import { Plus, X } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ImageDTO } from "@dtos/ImageDTO";

import { api } from "@services/api";

const SELECTOR_SIZE = 3;

export function ImageSelector() {
  const toast = useToast();

  const [selectedImages, setSelectedImages] = useState<ImageDTO[]>([]);

  async function handleAddImage() {
    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (selectedImage.canceled) {
      return;
    }

    if (selectedImage.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(selectedImage.assets[0].uri)

      if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          title: 'Imagem muito grande',
          bg: 'red.500',
        });
      }

      const fileExtension = selectedImage.assets[0].uri.split('0').pop();

      const photoFile = {
        name: `${Math.random().toString().replace('0.', '')}.${fileExtension}`,
        uri: selectedImage.assets[0].uri,
        type: `${selectedImage.assets[0].type}/${fileExtension}`,
      } as any
      console.log(photoFile);

      setSelectedImages((prevState) => [...prevState, photoFile]);
    }
  }

  function handleRemoveImage(file: ImageDTO) {
    setSelectedImages((prevState) => prevState.filter((item) => item.uri !== file.uri));
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
      mt={4}
    >
      {selectedImages &&
        selectedImages.map((item) => (
          <Center size="100" rounded="md" overflow="hidden">
            <Image
              source={{
                uri: item.uri.startsWith('file')
                  ? item.uri
                  : `${api.defaults.baseURL}/images/${item.uri}`
              }}
              size="100%"
              resizeMode="cover"
              alt="Imagem do produto"
            />
            <TouchableOpacity
              style={{ width: 16, height: 16, position: 'absolute', zIndex: 1, backgroundColor: '#3E3A40', borderRadius: 16, justifyContent: 'center', alignItems: 'center', top: 4, right: 4 }}
              onPress={() => handleRemoveImage(item)}
            >
              <Icon as={<X size={12} />} color="gray_7" />
            </TouchableOpacity>
          </Center>
        ))
      }

      {selectedImages.length < SELECTOR_SIZE && (
        <Pressable size="100" bg="gray_5" rounded="md" justifyContent="center" alignItems="center" onPress={handleAddImage}>
          <Icon as={<Plus size={24} />} color="gray_4" />
        </Pressable>
      )}
    </ScrollView>
  );
}

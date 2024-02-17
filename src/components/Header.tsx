import { TouchableOpacity } from "react-native";
import { Box, HStack, Icon, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, PencilSimpleLine, Plus } from "phosphor-react-native";

import { AppNavigatorRouteProps } from "@routes/app.routes";

type Props = {
  title: string;
  showBackButton?: boolean;
  showEditButton?: boolean;
  showAddButton?: boolean;
}

export function Header({
  title,
  showBackButton = false,
  showEditButton = false,
  showAddButton = false,
}: Props) {
  const navigation = useNavigation<AppNavigatorRouteProps>();

  function handleRightButton() {
    if (showAddButton) {
      navigation.navigate("new_advertise");
    }
  }

  function handleLeftButton() {
    navigation.goBack();
  }

  return (
    <HStack justifyContent="space-between" alignItems="center">
      {showBackButton ? (
        <TouchableOpacity onPress={handleLeftButton}>
          <Icon as={<ArrowLeft size={24} />} color="gray_1" />
        </TouchableOpacity>
      ) : <Box size={6} />}

      <Text color="gray_1" fontFamily="heading" fontSize="xl">
        {title}
      </Text>

      {showEditButton ? (
        <TouchableOpacity onPress={handleRightButton}>
          <Icon as={<PencilSimpleLine size={24} />} color="gray_1" />
        </TouchableOpacity>
      ) : showAddButton ? (
        <TouchableOpacity onPress={handleRightButton}>
          <Icon as={<Plus size={24} />} color="gray_1" />
        </TouchableOpacity>
      ) : <Box size={6} />}
    </HStack>
  );
}

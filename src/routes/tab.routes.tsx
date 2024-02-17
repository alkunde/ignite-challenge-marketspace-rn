import { useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { House, Tag, SignOut } from "phosphor-react-native";

import { Loading } from "@components/Loading";

import { useAuth } from "@hooks/useAuth";

import { Home } from "@screens/Home";
import { MyAdvertises } from "@screens/MyAdvertises";

type TabRoutes = {
  home_route: undefined;
  my_advertises: undefined;
  getout: undefined;
}

export type TabNavigatorRouteProps = BottomTabNavigationProp<TabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray_2,
        tabBarInactiveTintColor: colors.gray_4,
        tabBarStyle: {
          backgroundColor: colors.gray_7,
          borderTopWidth: 0,
          paddingTop: sizes[8],
          paddingBottom: sizes[10],
          height: Platform.OS === "android" ? 'auto' : 84,
        }
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House color={color} size={iconSize} />
        }}
      />
      <Screen
        name="my_advertises"
        component={MyAdvertises}
        options={{
          tabBarIcon: ({ color }) => <Tag color={color} size={iconSize} />
        }}
      />
      <Screen
        name="getout"
        component={() => {
          const { signOut } = useAuth();

          useEffect(() => {
            const getOut = async () => {
              await signOut();
            };

            getOut();
          }, []);

          return <Loading />;
        }}
        options={{
          tabBarIcon: () => <SignOut color={colors.red_light} size={iconSize} />
        }}
      />
    </Navigator>
  );
}

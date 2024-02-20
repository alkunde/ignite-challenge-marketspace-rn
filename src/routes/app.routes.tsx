import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { TabRoutes } from "./tab.routes";
import { NewAdvertise } from "@screens/NewAdvertise";
import { PreviewAdvertise } from "@screens/PreviewAdvertise";

type AppRoutes = {
  tab_routes: undefined;
  advertises: undefined;
  new_advertise: undefined;
  preview_advertise: {
    name: string;
    description: string;
    price: number;
  };
}

export type AppNavigatorRouteProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="tab_routes">
      <Screen
        name="tab_routes"
        component={TabRoutes}
      />
      <Screen
        name="new_advertise"
        component={NewAdvertise}
      />
      <Screen
        name="preview_advertise"
        component={PreviewAdvertise}
      />
    </Navigator>
  );
}

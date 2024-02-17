import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";

type AuthRouteProps = {
  signin: undefined;
  signup: undefined;
}

export type AuthNavigatorRouteProps = NativeStackNavigationProp<AuthRouteProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRouteProps>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signin" component={SignIn} />
      <Screen name="signup" component={SignUp} />
    </Navigator>
  );
}

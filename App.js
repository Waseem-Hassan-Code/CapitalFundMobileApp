import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  UserHome,
  Welcome,
  
} from "./screens";
import DrawerNavigation from "./screens/navigator/DrawerNavigation";
import AdminNavigator from "./screens/navigator/AdminNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
        
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminSide"
          component={AdminNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{
            headerShown: false,
          }}
        />
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

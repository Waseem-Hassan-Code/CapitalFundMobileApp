import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  Welcome,
  TenantsRent,
  UserHome,
  MyComplaints,
  NewComplaint,
  PaymentHistory,
} from "./screens";
import DrawerNavigation from "./screens/navigator/DrawerNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DrawerNavigation">
      
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
          name="TenantsRents"
          component={TenantsRent}
          options={{
            headerShown: false,
          }}
        />
       
       
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

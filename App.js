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
          name="TenantsRents"
          component={TenantsRent}
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
        <Stack.Screen
          name="MyComplaints"
          component={MyComplaints}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewComplaint"
          component={NewComplaint}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentHistory"
          component={PaymentHistory}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

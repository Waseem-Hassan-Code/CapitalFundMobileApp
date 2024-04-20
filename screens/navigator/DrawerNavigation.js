import React from "react";
import { Button, View, Pressable, Image, Text } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import UserHome from "../user/UserHome";
import PaymentHistory from "../user/PaymentHistory";
import MyComplaints from "../user/MyComplaints";
import NewComplaint from "../user/NewComplaint";
import Icon from "react-native-vector-icons/MaterialIcons";


const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Home"

            drawerContent={
                (props) => {
                    return (
                        <SafeAreaView>
                            <View style={{
                                height: 200,
                                width: '100%',
                                justifyContent: 'center', alignItems: 'center',
                                backgroundColor: COLORS.primary
                            }}>
                                <Image

                                    resizeMode="stretch"
                                    source={require('../../assets/financial-success.png')}
                                />
                                <Text style={{
                                    color: 'white', marginVertical: 10, fontSize: 20, fontWeight: 'bold'
                                }}>Capital Fund</Text>
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    )
                }
            }


            screenOptions={{
                //  headerShown:false,
                drawerStyle: {
                    backgroundColor: 'white',

                },
                headerStyle: {
                    backgroundColor: COLORS.secondary,


                },
                headerTitleAlign: 'center', 
                
                headerTintColor: COLORS.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                     fontSize:26

                },
                drawerActiveTintColor: COLORS.primary

            }}>
            <Drawer.Screen name="CapitalFund" component={UserHome}
                options={{
                    drawerLabel: 'Capital Fund',
                    title: "Capital Fund",
                    drawerIcon: () =>
                    (
                        <Icon name="home" size={30} color={COLORS.secondary} />
                    )
                }}
            />
            <Drawer.Screen
                name="PaymentHistory"
                component={PaymentHistory}
                options={{
                    drawerLabel: 'Payment History',
                    title: "Payment History",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="paypal"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="MyComplaints"
                component={MyComplaints}
                options={{
                    drawerLabel: 'My Complaints',
                    title: "My Complaints",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="history"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="NewComplaint"
                component={NewComplaint}
                options={{
                    drawerLabel: 'New Complaint',
                    title: "New Complaint",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="error"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />


        </Drawer.Navigator>
    )
}
export default DrawerNavigation;




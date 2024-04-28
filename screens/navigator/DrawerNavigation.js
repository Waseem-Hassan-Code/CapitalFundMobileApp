import React from "react";
import { Button, View, Pressable, Image, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import UserHome from "../user/UserHome";
import PaymentHistory from "../user/PaymentHistory";
import MyComplaints from "../user/MyComplaints";
import NewComplaint from "../user/NewComplaint";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from 'react-native-simple-toast';
import { deleteToken } from "../../API_Services/Token";


const Drawer = createDrawerNavigator();
const DrawerNavigation = ({navigation}) => {

    const Logout=async()=>{
        Toast.show('Logout');
         deleteToken();
        navigation.navigate('Login');
        
    }  


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
                            <TouchableOpacity style={styles.logoutBtn}
                            onPress={Logout}>
                                <View style={styles.row}>
                                    <Icon name="logout" size={30} color={COLORS.secondary} />
                                    <Text style={styles.logoutText}>Logout</Text>
                                </View>

                            </TouchableOpacity>
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

const styles = StyleSheet.create({
    logoutBtn: {
        width: '100%', alignItems: 'center', justifyContent: 'center',
        borderWidth: 0.4, borderColor: COLORS.primary,
        paddingVertical: 5
    },
    row: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-start', width: '100%',
        paddingHorizontal: 20
    },
    logoutText: {
        fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: COLORS.primary
    }
})


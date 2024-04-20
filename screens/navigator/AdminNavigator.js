import React from "react";
import { Button, View, Pressable, Image, Text, StyleSheet } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
    GetUserComplaints,
    PropertyDetails,
    TenantResidencyInfo,
    TenantsDetails,
    TenantsPayments
} from '../admin';
import Toast from 'react-native-simple-toast';
import { TouchableOpacity } from "react-native-gesture-handler";
import { deleteToken, getRole, getToken } from "../../API_Services/Token";

const Drawer = createDrawerNavigator();
const AdminNavigator = ({navigation}) => {

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
                    fontSize: 20

                },
                drawerActiveTintColor: COLORS.primary

            }}>



            <Drawer.Screen
                name="PropertyDetails"
                component={PropertyDetails}
                options={{
                    drawerLabel: 'Property Details ',
                    title: "Property Details ",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="home"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />

            <Drawer.Screen
                name="TenantsDetails"
                component={TenantsDetails}
                options={{
                    drawerLabel: 'Tenants Details',
                    title: "Tenants Details",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="people"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="TenantResidencyInfo"
                component={TenantResidencyInfo}
                options={{
                    drawerLabel: 'Tenant Residency Info',
                    title: "Tenant Residency",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="person"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />

            <Drawer.Screen
                name="TenantsPayments"
                component={TenantsPayments}
                options={{
                    drawerLabel: 'Tenants Payments',
                    title: "Tenants Payments",
                    drawerIcon: () =>
                    (
                        <Icon
                            name="payment"
                            size={30}
                            color={COLORS.secondary}
                        />
                    )
                }}
            />
            <Drawer.Screen name="GetUserComplaints" component={GetUserComplaints}
                options={{
                    drawerLabel: 'Get User Complaints',
                    title: "User Complaints",
                    drawerIcon: () =>
                    (
                        <Icon name="error" size={30} color={COLORS.secondary} />
                    )
                }}
            />
            {/* <Drawer.Screen name="Logout" component={Logout}
                options={{
                    drawerLabel: 'Get User Complaints',
                    title: "User Complaints",
                    drawerIcon: () =>
                    (
                        <Icon name="error" size={30} color={COLORS.secondary} />
                    )
                }}
            /> */}

        </Drawer.Navigator>
    )
}
export default AdminNavigator;
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



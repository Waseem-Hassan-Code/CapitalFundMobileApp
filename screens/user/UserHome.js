import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getId, getName } from "../../API_Services/Token";
import { getMonthlyFair } from "../../API_Services/userApi";
import { useNavigation } from "@react-navigation/native";

export default function UserHome() {
  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const [name, setName] = useState(null);
  const [rent, setRent] = useState(null);
  const [lateFee, setLateFee] = useState(null);
  const [month, setMonth] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullName = await getName();
        const firstName = fullName.split(" ")[0];
        setName(firstName);
        const userId = await getId();
        const result = await getMonthlyFair(userId);
        setRent(result.results.rent);
        setLateFee(result.results.lateFee);
        setMonth(result.results.month);
        setMaintenance(result.results.areaMaintainienceFee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentTime(new Date().getHours());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const setGreetingAndIcon = (currentTime) => {
    let greeting, iconName;
    if (currentTime >= 5 && currentTime < 12) {
      greeting = "Good Morning";
      iconName = "wb_sunny";
    } else if (currentTime >= 12 && currentTime < 18) {
      greeting = "Good Afternoon";
      iconName = "wb_cloudy";
    } else {
      greeting = "Good Evening";
      iconName = "brightness-3";
    }
    return { greeting, iconName };
  };

  const { greeting, iconName } = setGreetingAndIcon(currentTime);

  const calculateTotalBalance = () => {
    if (rent !== null && maintenance !== null && lateFee !== null) {
      const totalBalance = rent + maintenance + lateFee;
      return totalBalance.toFixed(2);
    } else {
      return "Loading...";
    }
  };

  return (
    <View style={styles.main}>

      <View style={styles.upper}>
        <Text style={styles.heading}>{'Capital'}</Text>
      </View>

      <View style={styles.lower}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Current Balance is ${calculateTotalBalance()}</Text>



          <View style={styles.rw}>
            <View style={styles.right}>
              <Text style={styles.cardTitleHeading}>Description</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.cardTitleHeading}>Amount</Text>
            </View>



          </View>
          <View style={styles.rw}>
            <View style={styles.right}>
              <Text style={styles.cardTitle}>Rent</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.cardTitle}>{rent}</Text>
            </View>
          </View>



          <View style={styles.rw}>
            <View style={styles.right}>
              <Text style={styles.cardTitle}>Maintenance</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.cardTitle}>{maintenance}</Text>
            </View>
          </View>


          <View style={styles.rw}>
            <View style={styles.right}>
              <Text style={styles.cardTitle}>Late Fee</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.cardTitle}>{lateFee}</Text>
            </View>
          </View>


          <View style={{...styles.rw,borderTopWidth:2}}>
            <View style={styles.right}>
              <Text style={styles.cardTitleHeading}>Total Balance</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.cardTitleHeading}>$550</Text>
            </View>
          </View>


        </View>
      </View>




       
    </View>



  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1, backgroundColor: '#f0f0f0', margin: 10
  },
  heading: {
    fontSize: 24, color: COLORS.primary, fontWeight: "bold"
  },
  upper: {
    flex: 1,
    justifyContent: "center", alignItems: "center"
  },
  lower: {
    flex: 5,
  },
  card: {
    backgroundColor: 'white', elevation: 5, padding: 10,borderRadius:10,
    shadowColor:COLORS.primary
  },
  cardTitle: {
    fontSize: 16, color: COLORS.primary
  },
  rw: {
    flexDirection: 'row', alignItems: "center",
     justifyContent: 'space-evenly',borderBottomWidth:0.5,paddingVertical:10,
     borderColor:COLORS.secondary
  },
  cardTitleHeading: {
    fontSize: 16, color: COLORS.primary, fontWeight: 'bold', alignSelf: 'center'
  },
  right: {
    width: '50%', margin: 5,
  },
  left: {
    width: '50%', margin: 5,alignItems:"center"
  }
});

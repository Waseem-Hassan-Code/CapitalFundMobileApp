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
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 50,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: COLORS.white,
            fontWeight: 900,
            marginLeft: 4,
          }}
        >
          Capital Fund
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* content  */}

        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            top: 20,
            width: "100%",
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: COLORS.white,
              }}
            >
              Hi, {name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: "800", color: "white" }}>
              {greeting}
            </Text>
            <View style={{ width: 5 }}></View>
            <Icon name={iconName} size={30} color="white" />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.heading}>
                  Your current balance: ${calculateTotalBalance()}
                </Text>
                <Text style={styles.subHeading}>{month}</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.row}>
                  <Text
                    style={[
                      styles.column,
                      { color: "#2e32a5", fontSize: 15, fontWeight: "800" },
                    ]}
                  >
                    Description
                  </Text>

                  <Text
                    style={[
                      styles.column,
                      { color: "#2e32a5", fontSize: 15, fontWeight: "800" },
                    ]}
                  >
                    Amount
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.column}>Rent</Text>
                  <Text style={styles.column}>{rent}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.column}>Maintenance</Text>
                  <Text style={styles.column}>{maintenance}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={[styles.column, { color: "#d62c2c" }]}>
                    Late Fee
                  </Text>
                  <Text style={[styles.column, { color: "#d62c2c" }]}>
                    {lateFee}
                  </Text>
                </View>
                <View style={[styles.row, styles.totalRow]}>
                  <Text style={styles.totalColumn}>Total Balance</Text>
                  <Text style={styles.totalColumn}>$550</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <Pressable
              onPressIn={handlePressIn}
              onPress={() => navigation.navigate("PaymentHistory")}
              onPressOut={handlePressOut}
            >
              {({ pressed }) => (
                <View style={[styles.box, pressed && styles.boxPressed]}>
                  <Icon
                    name="paypal"
                    size={30}
                    color={pressed ? "blue" : "red"}
                  />
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    Payment
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    History
                  </Text>
                </View>
              )}
            </Pressable>

            <Pressable
              onPressIn={handlePressIn}
              onPress={() => navigation.navigate("NewComplaint")}
              onPressOut={handlePressOut}
            >
              {({ pressed }) => (
                <View style={[styles.box, pressed && styles.boxPressed]}>
                  <Icon
                    name="error"
                    size={30}
                    color={pressed ? "blue" : "red"}
                  />
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    New
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    Complaints
                  </Text>
                </View>
              )}
            </Pressable>

            <Pressable
              onPressIn={handlePressIn}
              onPress={() => navigation.navigate("MyComplaints")}
              onPressOut={handlePressOut}
            >
              {({ pressed }) => (
                <View style={[styles.box, pressed && styles.boxPressed]}>
                  <Icon
                    name="history"
                    size={30}
                    color={pressed ? "blue" : "red"}
                  />
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    My
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { color: pressed ? "blue" : COLORS.white },
                    ]}
                  >
                    Complaints
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 30,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  boxPressed: {
    backgroundColor: "#d3d3d3",
  },
  icon: {
    marginBottom: 10,
    color: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.white,
  },
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 30,
    margin: 5,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  column: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  totalColumn: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
});

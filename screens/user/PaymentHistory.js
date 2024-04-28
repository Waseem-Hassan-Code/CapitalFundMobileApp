import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { getId } from "../../API_Services/Token";
import { getPaymentHistory } from "../../API_Services/userApi";

const PaymentHistory = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await getId();
        const result = await getPaymentHistory(uid, 1, 10);
        console.log("payment history", result);
        if (result.isSuccess) {
          const mappedData = result.results.items.map((item) => ({
            month: item.month,
            amount: calculateTotalBalance(
              parseFloat(item.rent),
              parseFloat(item.areaMaintainienceFee),
              parseFloat(item.lateFee)
            ),
            paidAt: item.rentPayedAt,
            late: item.isLate,
          }));
          setData(mappedData);
        } else {
          console.error("Error: No items in the result.");
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalBalance = (rent, maintenance, lateFee) => {
    rent = parseFloat(rent) || 0;
    maintenance = parseFloat(maintenance) || 0;
    lateFee = parseFloat(lateFee) || 0;

    const totalBalance = rent + maintenance + lateFee;
    return totalBalance.toFixed(2);
  };

  const renderPaymentItem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Month: {item.month}
            </Text>
            <Text style={{ fontSize: 16 }}>Amount: ${item.amount}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>Paid at: </Text>
              {item.paidAt ? (
                <Text>{item.paidAt}</Text>
              ) : (
                <View
                  style={{
                    backgroundColor: "#4e7cc1",
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>Unpaid</Text>
                </View>
              )}
            </View>
          </View>
          {item.late && (
            <View
              style={{
                backgroundColor: "red",
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Late
              </Text>
            </View>
          )}

          <MaterialIcons name="payment" size={24} color="black" />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        {/* <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.white,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          Payment History
        </Text> */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPaymentItem}
          contentContainerStyle={{ paddingHorizontal: 22 }}
        />
        <View
          style={{
            paddingHorizontal: 22,
            paddingBottom: 20,
            width: "100%",
            position: "absolute",
            bottom: 20,
          }}
        >
          <Button
            title="Back To Home"
            onPress={() => navigation.navigate("UserHome")}
            style={{
              marginTop: 22,
              width: "100%",
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default PaymentHistory;

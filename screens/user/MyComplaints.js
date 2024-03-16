import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../constants/colors";
import Button from "../../components/Button";
import { getId } from "../../API_Services/Token";
import { getComplaintsHistory } from "../../API_Services/userApi";

const MyComplaints = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = await getId();
        const result = await getComplaintsHistory(uid, 1, 10);
        console.log("complaint", result);
        if (result.isSuccess) {
          // Map the retrieved data to match the structure of the data array
          const mappedData = result.results.items.map((item) => ({
            title: item.title,
            complaintDate: item.createdAt,
            details: item.details,
            status: item.isFixed,
          }));
          setData(mappedData);
        } else {
          console.error("Error: No items in the result.");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchData();
  }, []);

  const renderComplaintItem = ({ item }) => {
    // Convert createdAt date string to Date object
    const createdAtDate = new Date(item.complaintDate);
    // Extract month, day, and year
    const month = createdAtDate.toLocaleString("default", { month: "long" });
    const day = createdAtDate.getDate();
    const year = createdAtDate.getFullYear();

    return (
      <View>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 10,
            padding: 15,
            marginVertical: 10,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Title: {item.title}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Complaint Date: {month} {day}, {year}
          </Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>
            Details: {item.details}
          </Text>
          <View
            style={{
              backgroundColor: item.status ? "green" : "red",
              borderRadius: 10,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: COLORS.white }}>
              {item.status ? "Resolved" : "Pending"}
            </Text>
          </View>
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
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.white,
            textAlign: "center",
            marginTop: 40,
            marginBottom: 10,
          }}
        >
          My Complaints
        </Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderComplaintItem}
          contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 70 }}
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

export default MyComplaints;

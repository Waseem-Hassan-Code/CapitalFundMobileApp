import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Picker,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-simple-toast";
import {
  deleteTenantInfo,
  getTenantsInfo,
} from "../../../API_Services/TenantsManagment";
import { styles } from "./style";
import COLORS from "../../../constants/colors";

const PropertyDetails = () => {
  const [dataTenant, setDataTenant] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editedProperty, setEditedProperty] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    isEmailVerified: "",
  });

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    let properties = await getTenantsInfo(1, 10);
    setDataTenant(properties?.results?.items);
  };

  const deleteItem = async (id) => {
    let response = await deleteTenantInfo(id);

    if (response.isSuccess) {
      Toast.show("Property deleted successfully.");
      getTenantsInfo();
    } else {
      Toast.show("Failed to delete property.");
    }
  };

  const renderPropertyItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.propertyName}>{item.name}</Text>
          <View style={styles.propertyActions}>
            <TouchableOpacity onPress={() => viewDetails(item)}>
              <Icon name="info" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Icon name="edit" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Icon name="delete" size={24} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.propertyDetails}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Id:</Text> {item.id}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Email:</Text> {item.email}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Password:</Text>{" "}
            {item.password.substring(0, 8)}****
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Gender:</Text> {item.gender}
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Password:</Text> {item.role}
          </Text>
          <View style={styles.badgesContainer}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: item.isActive ? COLORS.primary : COLORS.red,
                  borderRadius: 8,
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {item.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: item.isEmailVerified
                    ? COLORS.green
                    : COLORS.red,
                  borderRadius: 8,
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {item.isEmailVerified ? "Verified" : "Unverified"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const viewDetails = (property) => {
    // Implement view details functionality here
    console.log("View details:", property);
  };

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditedProperty({
      name: property.name,
      email: property.email,
      password: property.password,
      gender: property.gender,
      role: property.role,
      isEmailVerified: property.isEmailVerified,
    });
    setEditModalVisible(true);
  };

  const saveChanges = () => {
    // Implement logic to save edited property data
    console.log("Save changes:", editedProperty);
    setEditModalVisible(false);
  };

  return (
    <View>
      {/* FlatList rendering */}
      <FlatList
        data={dataTenant}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Edit Modal */}
      {selectedProperty && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Edit Property: {selectedProperty.name}</Text>
            {/* Input fields */}
            <TextInput
              style={styles.input}
              value={editedProperty.name}
              onChangeText={(text) =>
                setEditedProperty({ ...editedProperty, name: text })
              }
              placeholder="Property Name"
            />
            {/* Add other input fields as needed */}
            <TouchableOpacity onPress={() => saveChanges()}>
              <Text style={styles.button}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={styles.button}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PropertyDetails;

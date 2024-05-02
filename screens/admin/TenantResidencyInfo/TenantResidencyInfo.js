import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  map,
} from "react-native";
import {
  createTenantResidency,
  deleteTenantResidency,
  getenantResidency,
  updateTenantResidency,
} from "../../../API_Services/TenantsResidency";
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Plus from "react-native-vector-icons/AntDesign";
import COLORS from "../../../constants/colors";
import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";
import PrimaryTextInput from "../../../components/primaryTextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DateIcon from "react-native-vector-icons/Fontisto";
import { getAllProperties } from "../../../API_Services/BuildingsManagment";
import {
  getPropertiesNameDDL,
  getUserNameDDL,
} from "../../../API_Services/AdditionalAPIs";
import { useIsFocused } from "@react-navigation/native";

const TenantResidencyInfo = () => {
  const isFocused = useIsFocused();
  const [ResidencyData, setResidencyData] = useState();
  const [modalOptions, setModalOptions] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [detail, setdetail] = useState(null);
  const [isFormModal, setFormModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [userNameList, setUserNameList] = useState();
  const [userPropertiesList, setPropertiesList] = useState();
  const [isModalUpdate, setModalUpdate] = useState(false);

  // all input fields of form are here
  const [selectedUser, setSelectedUser] = useState("Select Username");
  const [selectedProperty, setSelectedProperty] = useState();
  const [rentPerMonth, setRentPerMonth] = useState(0);
  const [movedOutDate, setMovedOutDate] = useState(new Date());
  const [movedInDate, setMovedInDate] = useState(new Date());
  const [dateToShow, setdateToShow] = useState("select date");
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    getUserNamesList();
    getPropertiesNamesList();
    getTanentsData();
  }, [isFocused]);

  const getUserNamesList = async () => {
    let userNamesResponse = await getUserNameDDL();

    setUserNameList(userNamesResponse?.results);
  };

  const getPropertiesNamesList = async () => {
    let propertiesResponse = await getPropertiesNameDDL();

    setPropertiesList(propertiesResponse?.results);
  };

  const submitData = async () => {
    // console.log('iddd = ',selectedUser);
    // return;
    const formattedDateMovedIn = movedInDate.toLocaleDateString("en-US", {
      timeZone: "Asia/Karachi",
    });
    const formattedTimeMovedIn = movedInDate.toLocaleTimeString("en-US", {
      timeZone: "Asia/Karachi",
    });
    // setMovedInDate(formattedDateMovedIn)

    // console.log('moved in date = ', movedInDate);
    const obj = {
      id: "",
      userId: selectedUser,
      propertyId: selectedProperty,
      movedIn: movedInDate,
      movedOut: "in Residence",
      rentPerMonth: rentPerMonth,
    };

    let res = await createTenantResidency(obj);
    if (res.isSuccess) {
      Toast.show(res.message);
      setFormModal(false);
      getTanentsData();
    }
    console.log(res);
  };
  const getTanentsData = async () => {
    let data = await getenantResidency(1, 10);
    setResidencyData(data?.results?.items);
  };

  const Open_Options = (item) => {
    setdetail(item);
    setModalOptions(true);
  };

  const changeRent = (v) => {
    setRentPerMonth(v);
  };
  const renderData = ({ item }) => {
    console.log("jjjj");
    console.log(item);
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={[styles.propertyName, { fontSize: 19, color: "green" }]}>
            {item.propertyName}
          </Text>
          <View style={styles.propertyActions}>
            <TouchableOpacity onPress={() => openModelUpdate(item)}>
              <Icon name="edit" size={25} color={"green"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Open_Options(item)}>
              <Icon name="delete" size={25} color={"red"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.propertyDetails}>
          <Text style={{ fontSize: 17 }}>
            <Text style={{ fontWeight: "bold" }}>Tenant Name:</Text>{" "}
            {item?.userName}
          </Text>

          <Text style={{ fontSize: 17 }}>
            <Text style={{ fontWeight: "bold" }}>Property Name:</Text>{" "}
            {item?.propertyName}
          </Text>

          <Text style={{ fontSize: 17 }}>
            <Text style={{ fontWeight: "bold" }}>Rent per month:</Text>{" "}
            {item?.rentPerMonth}
            {"$"}
          </Text>

          <Text style={{ fontSize: 17 }}>
            <Text style={{ fontWeight: "bold" }}>Moved in:</Text>{" "}
            {item?.movedIn
              ? new Date(item.movedIn).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              : "N/A"}
          </Text>
        </View>
      </View>
    );
  };

  const deleteData = async () => {
    let response = await deleteTenantResidency(detail.id);

    if (response.isSuccess) {
      console.log("abcd");
      Toast.show("Deleted successfully!");

      setModalOptions(false);
      getTanentsData();
    }
    console.log("----after delete --------", response.isSuccess);
  };
  const showDatepicker = () => {
    if (showPicker) {
      console.log("aaa");
      setShowPicker(false);
    }

    setShowPicker(true);
  };
  const onChange = (event, selectedDate) => {
    console.log("date");
    const currentDate = selectedDate || date;
    setShowPicker(false); // Close the picker on iOS
    const formattedDateMovedIn = currentDate.toLocaleDateString("en-US", {
      timeZone: "Asia/Karachi",
    });
    setdateToShow(formattedDateMovedIn);
    console.log(dateToShow);
    setMovedInDate(currentDate);
  };
  const getRent = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");

    setRentPerMonth(cleanedText);
  };

  const openModelUpdate = (item) => {
    setdetail(item);
    // console.log(item?.rentPerMonth);
    setSelectedUser(item?.userName);
    setSelectedProperty(item?.propertyName);
    setRentPerMonth(item?.rentPerMonth);

    setdateToShow(item?.movedIn);
    setModalUpdate(true);
  };

  const UpdateData = async () => {
    console.log("going to update");
    console.log(detail.id);

    const obj = {
      id: detail.id,
      userId: selectedUser,
      propertyId: selectedProperty,
      movedIn: movedInDate,
      movedOut: "in Residence",
      rentPerMonth: rentPerMonth,
    };

    let res = await updateTenantResidency(obj);
    if (res.isSuccess) {
      Toast.show(res.message);

      setModalUpdate(false);
      getTanentsData();
      setModalOptions(false);
    }

    console.log(res);
  };

  return (
    <View>
      <FlatList
        data={ResidencyData}
        renderItem={renderData}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setFormModal(true)}
      >
        <Plus name="plus" size={25} color={"white"} />
      </TouchableOpacity>

      <Modal
        isVisible={modalOptions}
        onBackdropPress={() => setModalOptions(false)}
        onBackButtonPress={() => setModalOptions(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            width: "80%",
            alignSelf: "center",
            borderRadius: 10,
            paddingVertical: 40,
          }}
        >
          <Text style={styles.textStylebtn2}>{"Do you want to delete?"}</Text>
          <View style={styles.ysnoBtn}>
            <TouchableOpacity style={styles.yessNo} onPress={deleteData}>
              <Text style={{ color: "white" }}>{"Yess"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.yessNo}
              onPress={() => setModalOptions(false)}
            >
              <Text style={{ color: "white" }}>{"No"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isFormModal}
        onBackButtonPress={() => setFormModal(false)}
        onBackdropPress={() => setFormModal(false)}
      >
        <View style={styles.formContainer}>
          <Text style={styles.txtHeading}>{"Fill Form"}</Text>

          <View style={styles.inputstyle}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUser(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"Select Username"}
                color="gray"
                value={""}
              />

              {userNameList?.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.inputstyle}>
            <Picker
              selectedValue={selectedProperty}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedProperty(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"Select Property"}
                color="gray"
                value={""}
              />

              {userPropertiesList?.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Rent/month"
            onChangeText={getRent}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.datePickerView}
            onPress={showDatepicker}
          >
            <Text style={styles.txt}>{dateToShow}</Text>
            <DateIcon name="date" size={25} color={"green"} />
          </TouchableOpacity>

          {showPicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={movedInDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ color: "red" }}
            />
          ) : null}

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => submitData()}
          >
            <Text style={styles.textStylebtn}>{"Submit"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isModalUpdate}
        onBackButtonPress={() => setModalUpdate(false)}
        onBackdropPress={() => setModalUpdate(false)}
      >
        <View style={styles.formContainer}>
          <Text style={styles.txtHeading}>{"update form"}</Text>

          <View style={styles.inputstyle}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedUser(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"select User"}
                color="gray"
                value={""}
              />

              {userNameList?.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.inputstyle}>
            <Picker
              selectedValue={selectedProperty}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedProperty(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"select Property"}
                color="gray"
                value={""}
              />

              {userPropertiesList?.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.inputstyle}
            onChangeText={(v) => changeRent(v)}
            value={rentPerMonth?.toString()}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.datePickerView}
            onPress={showDatepicker}
          >
            <Text>{dateToShow}</Text>
            <DateIcon name="date" size={25} color={"green"} />
          </TouchableOpacity>

          {showPicker ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={movedInDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ color: "red" }}
            />
          ) : null}

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => UpdateData()}
          >
            <Text style={styles.textStylebtn}>{"Update"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default TenantResidencyInfo;

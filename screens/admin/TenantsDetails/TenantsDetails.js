import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  map,
} from "react-native";
import COLORS from "../../../constants/colors";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Plus from "react-native-vector-icons/AntDesign";

import Modal from "react-native-modal";
import Toast from "react-native-simple-toast";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DateIcon from "react-native-vector-icons/Fontisto";
import { useIsFocused } from "@react-navigation/native";
import { getTenantsNameDDL } from "../../../API_Services/AdditionalAPIs";
import {
  createPayments,
  deletePayments,
  getAllPayments,
  updatePayments,
} from "../../../API_Services/TenantsPayments";
import {
  getTenantsInfo,
  addNewTenant,
  updateTenantInfo,
} from "../../../API_Services/TenantsManagment";

const PropertyDetails = () => {
  const isFocused = useIsFocused();
  const [paymentsData, setPaymentsData] = useState();
  const [TenantsList, setTenantsList] = useState();
  const [modalOptions, setModalOptions] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const [detail, setdetail] = useState(null);
  const [isFormModal, setFormModal] = useState(false);

  const [isModalUpdate, setModalUpdate] = useState(false);

  // all input fields of form are here
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Select Gender");
  const [role, setRole] = useState("Select Role");
  const [isActive, setIsActive] = useState("Select User State");
  const [isEmailVerified, setIsEmailVerified] = useState("Email State");

  const [movedInDate, setMovedInDate] = useState(new Date());
  const [dateToShow, setdateToShow] = useState("select date");
  const [showPicker, setShowPicker] = useState(false);
  const [isPayable, setIsPayable] = useState(true);
  const [payedDate, setPayedDate] = useState(new Date());
  useEffect(() => {
    getAllTenantsList();

    getTenantsName();
  }, [isFocused]);

  const getTenantsName = async () => {
    let res = await getTenantsNameDDL();
    setTenantsList(res?.results);
  };

  const getAllTenantsList = async () => {
    console.log("hhhh");
    let userNamesResponse = await getTenantsInfo(1, 10);
    console.log(userNamesResponse);
    if (userNamesResponse.isSuccess == false) {
      setPaymentsData("");
    } else {
      setPaymentsData(userNamesResponse.results.items);
    }
  };

  const submitData = async () => {
    const formattedDateMovedIn = movedInDate.toLocaleDateString("en-US", {
      timeZone: "Asia/Karachi",
    });
    const formattedTimeMovedIn = movedInDate.toLocaleTimeString("en-US", {
      timeZone: "Asia/Karachi",
    });
    // setMovedInDate(formattedDateMovedIn)

    const obj = {
      id: "",
      name: name,
      email: email,
      password: password,
      gender: gender,
      role: role,
      isActive: isActive,
      otp: "",
      isEmailVerified: isEmailVerified,
    };

    let res = await addNewTenant(obj);
    console.log(res);
    if (res.isSuccess) {
      Toast.show(res.message);
      setFormModal(false);
      getAllTenantsList();
    }
    console.log(res);
  };

  const Open_Options = (item) => {
    setdetail(item);
    setModalOptions(true);
  };

  const renderData = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={[styles.propertyName, { color: "green" }]}>
            {item.name}
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
          <Text>
            <Text style={{ fontWeight: "bold" }}>Uid:</Text> {item?.id}
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Email:</Text> {item?.email}
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Password:</Text>{" "}
            {item.password.substring(0, 8)}****
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Role:</Text> {item.role}
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

  const deleteData = async () => {
    // console.log(paymentsData);
    // console.log('deleting ......');

    let response = await deletePayments(detail.id);
    console.log(response);
    if (response.isSuccess) {
      getAllTenantsList();
      Toast.show("Deleted successfully!");

      setModalOptions(false);
    } else {
      setModalOptions(false);
      Toast.show("can not delete sorry");
    }
  };
  // const showDatepicker = () => {

  //     if (showPicker) {
  //         console.log('aaa');
  //         setShowPicker(false);
  //     }

  //     setShowPicker(true);
  // };

  const onChange = (event, selectedDate) => {
    console.log("date");
    const currentDate = selectedDate || date;
    setShowPicker(false); // Close the picker on iOS
    const formattedDateMovedIn = currentDate.toLocaleDateString("en-US", {
      timeZone: "Asia/Karachi",
    });
    setdateToShow(formattedDateMovedIn);

    setPayedDate(currentDate);
  };

  const openModelUpdate = (item) => {
    // setSelectedTenants(item.selectedTenants);
    setId(item.id);
    setName(item.name);
    setEmail(item.email);
    setPassword(item?.password);
    setGender(item.gender);
    setRole(item.role);
    setIsActive(item.isActive);
    setIsEmailVerified(item.isEmailVerified);
    setdetail(item);
    setModalUpdate(true);
  };
  const showDatepicker = () => {
    if (showPicker) {
      console.log("aaa");
      setShowPicker(false);
    }

    setShowPicker(true);
  };

  const UpdateData = async () => {
    console.log("going to update");

    const obj = {
      id: detail.id,
      name: name,
      email: email,
      password: password,
      gender: gender,
      role: role,
      isActive: isActive,
      otp: "",
      isEmailVerified: isEmailVerified,
    };

    console.log(obj);

    let res = await updateTenantInfo(obj);
    console.log(res);

    if (res.isSuccess) {
      Toast.show(res.message);

      setModalUpdate(false);
      getAllTenantsList();
      setModalOptions(false);
    }

    console.log(res);
  };
  const showDetails = (item) => {
    setdetail(item);
    setModalDetail(true);
  };

  return (
    <View>
      <FlatList
        data={paymentsData}
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
          <Text style={[styles.txtHeading, { color: "green" }]}>
            {"Add User"}
          </Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Name"
            onChangeText={(v) => setName(v)}
            keyboardType="text"
          />

          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Email"
            onChangeText={(v) => setEmail(v)}
            keyboardType="text"
          />
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Password"
            onChangeText={(v) => setPassword(v)}
            keyboardType="numeric"
          />

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"Select Gender"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Male", value: "Male" },
                { id: 0, title: "Female", value: "Female" },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"Select Role"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Admin", value: "admin" },
                { id: 0, title: "User", value: "user" },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={isActive}
              onValueChange={(itemValue, itemIndex) => setIsActive(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"User State"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Active", value: true },
                { id: 0, title: "Inactive", value: false },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={isEmailVerified}
              onValueChange={(itemValue, itemIndex) =>
                setIsEmailVerified(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"Email State"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Verified", value: true },
                { id: 0, title: "Unverified", value: false },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

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
          <Text style={[styles.txtHeading, { color: "green" }]}>
            {"Update User"}
          </Text>

          <TextInput
            style={styles.inputstyle}
            placeholder="User Id"
            onChangeText={(v) => setId(v)}
            value={id?.toString()}
            keyboardType="text"
          />

          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Name"
            onChangeText={(v) => setName(v)}
            value={name?.toString()}
            keyboardType="text"
          />

          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Email"
            onChangeText={(v) => setEmail(v)}
            value={email?.toString()}
            keyboardType="text"
          />
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter User Password"
            onChangeText={(v) => setPassword(v)}
            value={password?.toString()}
            keyboardType="text"
          />

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"Select Gender"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Male", value: "Male" },
                { id: 0, title: "Female", value: "Female" },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"Select Role"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Admin", value: "admin" },
                { id: 0, title: "User", value: "user" },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={isActive}
              onValueChange={(itemValue, itemIndex) => setIsActive(itemValue)}
            >
              <Picker.Item
                key={0}
                label={"User State"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Active", value: true },
                { id: 0, title: "Inactive", value: false },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.ddstyle}>
            <Picker
              selectedValue={isEmailVerified}
              onValueChange={(itemValue, itemIndex) =>
                setIsEmailVerified(itemValue)
              }
            >
              <Picker.Item
                key={0}
                label={"Email State"}
                color="gray"
                value={""}
              />

              {[
                { id: 1, title: "Verified", value: true },
                { id: 0, title: "Unverified", value: false },
              ]?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.title}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => UpdateData()}
          >
            <Text style={styles.textStylebtn}>{"Submit"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default PropertyDetails;

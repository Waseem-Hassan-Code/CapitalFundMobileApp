import React, { useEffect, useState } from "react";
import {
    View, Text, FlatList,
    TouchableOpacity,
    TextInput, map
} from 'react-native';
import { createTenantResidency, deleteTenantResidency, getenantResidency } from '../../../API_Services/TenantsResidency';
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Plus from "react-native-vector-icons/AntDesign";
import COLORS from "../../../constants/colors";
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';
import PrimaryTextInput from "../../../components/primaryTextInput";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import DateIcon from "react-native-vector-icons/Fontisto";
import { getAllProperties } from "../../../API_Services/BuildingsManagment";
import { getPropertiesNameDDL, getUserNameDDL } from "../../../API_Services/AdditionalAPIs";


const TenantResidencyInfo = () => {

    const [ResidencyData, setResidencyData] = useState();
    const [modalOptions, setModalOptions] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [detail , setdetail] = useState(null);
    const [isFormModal, setFormModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [userNameList, setUserNameList] = useState();
    const [userPropertiesList, setPropertiesList] = useState();
    const [isModalUpdate,setModalUpdate]=useState(false);

    // all input fields of form are here
    const [selectedUser, setSelectedUser] = useState('Select Username');
    const [selectedProperty, setSelectedProperty] = useState();
    const [rentPerMonth, setRentPerMonth] = useState();
    const [movedOutDate, setMovedOutDate] = useState(new Date())
    const [movedInDate, setMovedInDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        getUserNamesList();
        getPropertiesNamesList();
        getTanentsData();


    }, [])

    const getUserNamesList = async () => {

        let userNamesResponse = await getUserNameDDL();

        setUserNameList(userNamesResponse?.results);

    }

    const getPropertiesNamesList = async () => {
        let propertiesResponse = await getPropertiesNameDDL();

        setPropertiesList(propertiesResponse?.results);
    }

    const submitData = async () => {

        const formattedDateMovedIn = movedInDate.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedTimeMovedIn = movedInDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi' });
        // setMovedInDate(formattedDateMovedIn)
        console.log('moved in date = ', movedInDate);
        const obj =
        {
            "id": "",
            "userId": selectedUser,
            "propertyId": selectedProperty,
            "movedIn": movedInDate,
            "movedOut": "in Residence",
            "rentPerMonth": rentPerMonth
        };

        let res = await createTenantResidency(obj);
        if(res.isSuccess)
        {
            Toast.show(res.message);
            setFormModal(false);
            getTanentsData();
        }
        console.log(res);

    }
    const getTanentsData = async () => {

        let data = await getenantResidency(1, 10);
        setResidencyData(data?.results?.items)

    }

    const Open_Options = (item) => {

        setdetail(item);
        setModalOptions(true)
    }


    const renderData = ({ item }) => {
        return (
            <View style={styles.showProperty}>
                <Text style={styles.textStyle}>{item.userName}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => Open_Options(item)}>
                    <Icon name="expand-more" size={25} color={'white'} />
                </TouchableOpacity>



            </View>
        )
    }

    const deleteData = async () => {

        console.log('deleting ......');

        let response = await deleteTenantResidency(detail.id);

        if (response.isSuccess) {
            console.log('abcd');
            Toast.show('Deleted successfully!');

            setModalOptions(false);
            getTanentsData();
        }
        console.log('----after delete --------', response.isSuccess);
    }
    const showDatepicker = () => {

        if (showPicker) {
            console.log('aaa');
            setShowPicker(false);
        }

        setShowPicker(true);
    };
    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate || date;
        setShowPicker(false); // Close the picker on iOS
        // const formattedDateMovedIn = currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        setMovedInDate(currentDate);
    };
    const getRent = (text) => {
        const cleanedText = text.replace(/[^0-9]/g, '');

        setRentPerMonth(cleanedText)
    }

    return (
        <View>
            <FlatList
                data={ResidencyData}
                renderItem={renderData}
                keyExtractor={(item, index) => index.toString()}
            />

            <TouchableOpacity style={styles.plusButton}
                onPress={() => setFormModal(true)}>
                <Plus name="plus" size={25} color={'white'} />
            </TouchableOpacity>

            <Modal isVisible={modalOptions}
                onBackdropPress={() => setModalOptions(false)}
                onBackButtonPress={() => setModalOptions(false)}>

                <View style={{ backgroundColor: 'white', padding: 10, width: '50%', alignSelf: 'center', borderRadius: 10 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => setModalDetail(true)}>
                        <Text style={styles.textStylebtn}>{'Detail'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={()=>setModalUpdate(true)}>
                        <Text style={styles.textStylebtn}>{'Update'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => deleteData()}>
                        <Text style={styles.textStylebtn}>{'Delete'}</Text>
                    </TouchableOpacity>
                </View>

            </Modal>


            <Modal isVisible={modalDetail}
                onBackdropPress={() => setModalDetail(false)}
                onBackButtonPress={() => setModalDetail(false)}>

                <View style={styles.detailModal}>
                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Username'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.userName}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'property Name'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.propertyName}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'rent per month'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.rentPerMonth}</Text>
                    </View>

                    <View style={styles.RowShow}>

                        <Text style={styles.rowItem}>{'Moved in'}</Text>


                        <Text style={styles.rowItemRight}>{detail?.movedIn}</Text>


                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Moved in'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.movedOut}</Text>
                    </View>


                </View>

            </Modal>

            <Modal isVisible={isFormModal} onBackButtonPress={() => setFormModal(false)}
                onBackdropPress={() => setFormModal(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'Fill Form'}</Text>

                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={selectedUser}
                            onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Username'} color="gray" value={""} />

                            {userNameList?.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={selectedProperty}
                            onValueChange={(itemValue, itemIndex) => setSelectedProperty(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Property'} color="gray" value={""} />

                            {userPropertiesList?.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>




                    <TextInput style={styles.inputstyle} placeholder='Enter Rent/month'
                        onChangeText={getRent}
                        keyboardType="numeric"
                    />



                    <TouchableOpacity style={styles.datePickerView}
                        onPress={showDatepicker}>
                        <Text style={styles.txt}>{
                            movedInDate.toString()
                        }</Text>
                        <DateIcon name="date" size={25} color={'green'} />
                    </TouchableOpacity>




                    {showPicker ? (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={movedInDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{ color: 'red' }}
                        />
                    ) : null}


                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => submitData()}>
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>

            <Modal isVisible={isModalUpdate} onBackButtonPress={() => setModalUpdate(false)}
                onBackdropPress={() => setModalUpdate(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'update form'}</Text>

                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={selectedUser}
                            onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Username'} color="gray" value={""} />

                            {userNameList?.map((item) => (
                                

                                    <Picker.Item key={item.id} label={item.name} value={item.id} />
                               
                                
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={selectedProperty}
                            onValueChange={(itemValue, itemIndex) => setSelectedProperty(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Property'} color="gray" value={""} />

                            {userPropertiesList?.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>




                    <TextInput style={styles.inputstyle} 
                        onChangeText={getRent}
                        value={(detail.rentPerMonth).toString()}
                        keyboardType="numeric"
                    />



                    <TouchableOpacity style={styles.datePickerView}
                        onPress={showDatepicker}>
                        <Text style={styles.txt}>{
                            movedInDate.toString()
                        }</Text>
                        <DateIcon name="date" size={25} color={'green'} />
                    </TouchableOpacity>




                    {showPicker ? (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={movedInDate}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            style={{ color: 'red' }}
                        />
                    ) : null}


                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => submitData()}>
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>
        </View>
    )
}
export default TenantResidencyInfo;
import React, { useEffect, useState } from "react";
import {
    View, Text, FlatList,
    TouchableOpacity,
    TextInput, map
} from 'react-native';
import { createTenantResidency, deleteTenantResidency, getenantResidency, updateTenantResidency } from '../../../API_Services/TenantsResidency';
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import Plus from "react-native-vector-icons/AntDesign";

import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import DateIcon from "react-native-vector-icons/Fontisto";
import { useIsFocused } from '@react-navigation/native';
import { getPropertiesNameDDL, getTenantsNameDDL, getUserNameDDL } from "../../../API_Services/AdditionalAPIs";
import { createPayments, deletePayments, getAllPayments, updatePayments } from "../../../API_Services/TenantsPayments";


const TenantsPayments = () => {
    const isFocused = useIsFocused();
    const [paymentsData, setPaymentsData] = useState();
    const [TenantsList, setTenantsList] = useState();
    const [modalOptions, setModalOptions] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [detail, setdetail] = useState(null);
    const [isFormModal, setFormModal] = useState(false);

    const [isModalUpdate, setModalUpdate] = useState(false);
    const months = [{ id: 1, title: 'january' },
    { id: 2, title: 'Feburary' }, { id: 3, title: 'March' }, { id: 4, title: 'April' }, { id: 5, title: 'May' },
    { id: 6, title: 'June' }, { id: 7, title: 'July' }, { id: 8, title: 'August' }, { id: 9, title: 'September' },
    { id: 10, title: 'October' }, { id: 11, title: 'November' }, { id: 12, title: 'December' }]

    // all input fields of form are here
    const [selectedTenants, setSelectedTenants] = useState('Select Username');
    const [rent, setRent] = useState(0);
    const [areMgtFee, setAreaMgtFee] = useState(0);
    const [isLate, setIsLate] = useState(false);
    const [lateFee, setLateFee] = useState(0);
    const [month, setMonth] = useState("");



    const [movedInDate, setMovedInDate] = useState(new Date());
    const [dateToShow, setdateToShow] = useState('select date');
    const [showPicker, setShowPicker] = useState(false);
    const [updateObject, setUpdateObject] = useState(null);
    const [isPayable, setIsPayable] = useState(true);
    const [payedDate, setPayedDate] = useState(new Date());
    useEffect(() => {
        getAllPaymentsList();

        getTenantsName();


    }, [isFocused])

    const getTenantsName = async () => {

        let res = await getTenantsNameDDL();
        setTenantsList(res?.results);

    }


    const getAllPaymentsList = async () => {
        console.log('hhhh');
        let userNamesResponse = await getAllPayments(1, 10);
        console.log(userNamesResponse?.results?.items);
        setPaymentsData(userNamesResponse.results.items)


    }



    const submitData = async () => {

        const formattedDateMovedIn = movedInDate.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        const formattedTimeMovedIn = movedInDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi' });
        // setMovedInDate(formattedDateMovedIn)

        console.log('moved in date = ', selectedTenants);
        const obj = {
            "id": "",
            "tenantId": selectedTenants,
            "rent": rent,
            "areaMaintainienceFee": areMgtFee,
            "isLate": isLate,
            "lateFee": lateFee,
            "rentPayedAt": "",
            "month": month,
            "isPayable": true
        }


        let res = await createPayments(obj);
        console.log(res);
        if (res.isSuccess) {
            Toast.show(res.message);
            setFormModal(false);
            getAllPaymentsList();
        }
        console.log(res);

    }

    const Open_Options = (item) => {

        setdetail(item);
        setModalOptions(true)
    }
     


    const renderData = ({ item }) => {

        return (
            <View>
                <View style={styles.showProperty}>
                    <Text style={styles.textStyle}>{item.tenantName}</Text>
                    <View style={styles.rightIcons}>
                        <TouchableOpacity onPress={() => Open_Options(item)}>
                            <Icon name="delete" size={25} color={'green'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openModelUpdate(item)}>
                            <Icon name="edit" size={25} color={'green'} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.RowShow}>
                    <Text style={styles.rowItem}>{'Tenant Name'}</Text>
                    <Text style={styles.rowItemRight}>{item?.tenantName}</Text>
                </View>
                <View style={styles.RowShow}>
                    <Text style={styles.rowItem}>{'Rent'}</Text>
                    <Text style={styles.rowItemRight}>{item?.rent}</Text>
                </View>

                <View style={styles.RowShow}>
                    <Text style={styles.rowItem}>{'Area Maintainience Fee'}</Text>
                    <Text style={styles.rowItemRight}>{item?.areaMaintainienceFee}</Text>
                </View>
                <View style={styles.RowShow}>

                    <Text style={styles.rowItem}>{'Is Late'}</Text>


                    <Text style={styles.rowItemRight}>{(item?.isLate) ? 'True' : 'False'}</Text>


                </View>

                <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Late fee'}</Text>
                        <Text style={styles.rowItemRight}>{item?.lateFee}</Text>
                    </View>
                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'is payable '}</Text>
                        <Text style={styles.rowItemRight}>{(item?.isPayable) ?

                            'True' : 'False'}</Text>
                    </View>
                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Month'}</Text>
                        <Text style={styles.rowItemRight}>{item?.month}</Text>
                    </View>



            </View>
        )
    }

    const deleteData = async () => {
        console.log(paymentsData);
        console.log('deleting ......');

        let response = await deletePayments(detail.id);
        console.log(response);
        if (response.isSuccess) {
            getAllPaymentsList();
            Toast.show('Deleted successfully!');

            setModalOptions(false);

        }
        else {
            setModalOptions(false);
            Toast.show('can not delete sorry');

        }
    }
    // const showDatepicker = () => {

    //     if (showPicker) {
    //         console.log('aaa');
    //         setShowPicker(false);
    //     }

    //     setShowPicker(true);
    // };

    const onChange = (event, selectedDate) => {
        console.log('date');
        const currentDate = selectedDate || date;
        setShowPicker(false); // Close the picker on iOS
        const formattedDateMovedIn = currentDate.toLocaleDateString('en-US', { timeZone: 'Asia/Karachi' });
        setdateToShow(formattedDateMovedIn)

        setPayedDate(currentDate);
    };

   
    const openModelUpdate = (item) => { 



        setSelectedTenants(item.selectedTenants);
        setRent(item.rent);
        setAreaMgtFee(item?.areaMaintainienceFee);
        setIsLate(item.isLate);
        setLateFee(item.lateFee);
        setMonth(item.month);
        setdetail(item);  
        setModalUpdate(true)


    }
    const showDatepicker = () => {

        if (showPicker) {
            console.log('aaa');
            setShowPicker(false);
        }

        setShowPicker(true);
    };

    const UpdateData = async () => {

        console.log('going to update');


        const obj = {

            "id": detail.id,
            "tenantId": selectedTenants,
            "rent": rent,
            "areaMaintainienceFee": areMgtFee,
            "isLate": isLate,
            "lateFee": lateFee,
            "rentPayedAt": payedDate,
            "month": month,
            "isPayable": true,


        }


        console.log(obj);

        let res = await updatePayments(obj);
        console.log(res);


        if (res.isSuccess) {
            Toast.show(res.message)

            setModalUpdate(false);
            getAllPaymentsList();
            setModalOptions(false);
        }   

        console.log(res);
    }
    const showDetails = (item) => {
        setdetail(item)
        setModalDetail(true)
    }

    return (
        <View>
            <FlatList
                data={paymentsData}
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

                <View style={{
                    backgroundColor: 'white', padding: 10, width: '80%',
                    alignSelf: 'center', borderRadius: 10, paddingVertical: 40
                }}>
                    <Text style={styles.textStylebtn2}>{'Do you want to delete?'}</Text>
                    <View style={styles.ysnoBtn}>
                        <TouchableOpacity style={styles.yessNo} onPress={deleteData}>
                            <Text style={{ color: 'white' }}>{'Yess'}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.yessNo} onPress={() => setModalOptions(false)}>
                            <Text style={{ color: 'white', }}>{'No'}</Text>

                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>


            



            <Modal isVisible={isFormModal} onBackButtonPress={() => setFormModal(false)}
                onBackdropPress={() => setFormModal(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'Fill Form'}</Text>

                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={selectedTenants}
                            onValueChange={(itemValue, itemIndex) => setSelectedTenants(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Tenants'} color="gray" value={""} />

                            {TenantsList?.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>



                    <TextInput style={styles.inputstyle} placeholder='Enter Rent'
                        onChangeText={(v) => setRent(v)}
                        keyboardType="numeric"
                    />
                    <TextInput style={styles.inputstyle} placeholder='Enter Area Management Fee'
                        onChangeText={(v) => setAreaMgtFee(v)}
                        keyboardType="numeric"
                    />

     

                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={isLate}
                            onValueChange={(itemValue, itemIndex) => setIsLate(itemValue)}
                        >
                            <Picker.Item key={0} label={'select is Late'} color="gray" value={""} />

                            {[{ id: 1, title: 'Yes', value: true }, { id: 0, title: 'No', value: false }]?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.value} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput style={styles.inputstyle} placeholder='Late Fee'
                        onChangeText={(v) => setLateFee(v)}
                        keyboardType="numeric"
                    />
                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={month}
                            onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
                        >
                            <Picker.Item key={0} label={'select month'} color="gray" value={""} />

                            {months?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.title} />
                            ))}
                        </Picker>
                    </View>








                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => submitData()}>
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>




            <Modal isVisible={isModalUpdate} onBackButtonPress={() => setModalUpdate(false)}
                onBackdropPress={() => setModalUpdate(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'Update Data'}</Text>

                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={selectedTenants}
                            onValueChange={(itemValue, itemIndex) => setSelectedTenants(itemValue)}
                        >
                            <Picker.Item key={0} label={'Select Tenants'} color="gray" value={""} />

                            {TenantsList?.map((item) => (
                                <Picker.Item key={item.id} label={item.name} value={item.id} />
                            ))}
                        </Picker>
                    </View>



                    <TextInput style={styles.inputstyle} placeholder='Enter Rent'
                        onChangeText={(v) => setRent(v)}
                        value={rent?.toString()}
                        keyboardType="numeric"
                    />
                    <TextInput style={styles.inputstyle} placeholder='Enter Area Management Fee'
                        onChangeText={(v) => setAreaMgtFee(v)}
                        value={areMgtFee?.toString()}
                        keyboardType="numeric"
                    />



                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={isLate}
                            onValueChange={(itemValue, itemIndex) => setIsLate(itemValue)}
                        >
                            <Picker.Item key={0} label={'select is Late'} color="gray" value={""} />

                            {[{ id: 1, title: 'Yes', value: true }, { id: 0, title: 'No', value: false }]?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.value} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput style={styles.inputstyle} placeholder='Late Fee'
                        onChangeText={(v) => setLateFee(v)}
                        keyboardType="numeric"
                        value={lateFee.toString()}
                    />


                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={isPayable}
                            onValueChange={(itemValue, itemIndex) => setIsLate(itemValue)}
                        >
                            <Picker.Item key={0} label={'Is Payable'} color="gray" value={""} />

                            {[{ id: 1, title: 'Yes', value: true }, { id: 0, title: 'No', value: false }]?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.value} />
                            ))}
                        </Picker>
                    </View>


                    <TouchableOpacity style={styles.datePickerView}
                        onPress={showDatepicker}>
                        <Text>{dateToShow}</Text>
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



                    <View style={styles.ddstyle}>
                        <Picker
                            selectedValue={month}
                            onValueChange={(itemValue, itemIndex) => setMonth(itemValue)}
                        >
                            <Picker.Item key={0} label={'select month'} color="gray" value={""} />

                            {months?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.title} />
                            ))}
                        </Picker>
                    </View>








                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => UpdateData()}>
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>
        </View>
    )
}
export default TenantsPayments;

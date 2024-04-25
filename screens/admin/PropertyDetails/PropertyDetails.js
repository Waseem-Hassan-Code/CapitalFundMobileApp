import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Touchable, TouchableOpacity, TextInput } from 'react-native';
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/colors";
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';
import { deletePropertyDetails, getAllProperties, createPropertyDetails, updatePropertyDetails } from "../../../API_Services/BuildingsManagment";
import Plus from "react-native-vector-icons/AntDesign";
import { Picker } from '@react-native-picker/picker';


const PropertyDetails = () => {

    const [dataProperty, setDataProperty] = useState();


    const [detail, setdetail] = useState(null);
    const [modalOptions, setModalOptions] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [currentLoadedData, setLoadedData] = useState();
    const [isFormModal, setFormModal] = useState(false);
    const [isModalUpdate, setModalUpdate] = useState(false);


    //form attributes
    const [pname, setPname] = useState('');
    const [address, setAddress] = useState('');
    const [pType, setpType] = useState('');
    const [rentPerMonth, setRentPerMonth] = useState(0);
    const [noOfBedrooms, setnoOfBedrooms] = useState(0);
    const [noOfBathrooms, setnoOfBathrooms] = useState(0);
    const [isAvailable, setIsAvailable] = useState(false);
    const [description, setDescription] = useState('');



    useEffect(() => {

        getProperties();

    }, [])
    const getProperties = async () => {


        let properties = await getAllProperties(1, 10);
        setDataProperty(properties?.results?.items)
        console.log(properties?.results?.items);
    }

    const submitData = async () => {



        const obj = {
            "id": "",
            "propertyName": pname,
            "address": address,
            "typeofProperty": pType,
            "numberofBedrooms": noOfBedrooms,
            "numberofBathrooms": noOfBathrooms,
            "isAvailable": isAvailable,
            "description": description
        }
        console.log('/////////////////////////////////////////');
        let res = await createPropertyDetails(obj);
        if (res.isSuccess) {
            Toast.show(res.message);
            setFormModal(false);
            getProperties();
        }
        console.log(res);

    }
    const Open_Options = (item) => {

        setdetail(item);
        setModalOptions(true);
    }
    const ShowProperty = ({ item }) => {



        return (
            <View style={styles.showProperty}>
                <Text style={styles.textStyle}>{item.propertyName}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => Open_Options(item)}>
                    <Icon name="expand-more" size={25} color={'white'} />
                </TouchableOpacity>



            </View>
        )
    }
    const openModelUpdate = () => {

        

        setPname(detail.propertyName);
        setAddress(detail.address);
        setpType(detail.typeofProperty);
        setnoOfBedrooms(detail.numberofBedrooms);
        setnoOfBathrooms(detail.numberofBathrooms);
        setIsAvailable(detail.isAvailable);
        setDescription(detail.description);
        setModalUpdate(true);

    }

    const updateData = async () => {

        const obj = {
            "id": detail.id,
            "propertyName": pname,
            "address": address,
            "typeofProperty": pType,
            "numberofBedrooms": noOfBedrooms,
            "numberofBathrooms": noOfBathrooms,
            "isAvailable": isAvailable,
            "description": description
        };
        let res = await updatePropertyDetails(obj)
        console.log(res);
        if (res.isSuccess) {
            setModalUpdate(false);
            setModalOptions(false);
            getProperties();
            Toast.show(res.message);
        }
    }
    const deleteItem = async () => {
        // console.log(detailHome?.id);
        let response = await deletePropertyDetails(detail?.id);

        if (response.isSuccess) {
            Toast.show('item deleted.')
            getProperties();
            setModalOptions(false);
        }
        console.log(response);
    }
    return (
        <View style={styles.main}>
            <FlatList
                data={dataProperty}
                renderItem={ShowProperty}
                keyExtractor={(item) => item.id}
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
                    <TouchableOpacity style={styles.btn} onPress={() => openModelUpdate()}>
                        <Text style={styles.textStylebtn}>{'Update'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => deleteItem()}>
                        <Text style={styles.textStylebtn}>{'Delete'}</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            <Modal isVisible={modalDetail}
                onBackdropPress={() => setModalDetail(false)}
                onBackButtonPress={() => setModalDetail(false)}>

                <View style={styles.detailModal}>
                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Property Name'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.propertyName}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'address'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.address}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Type of Property'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.typeofProperty}</Text>
                    </View>

                    <View style={styles.RowShow}>

                        <Text style={styles.rowItem}>{'No. of bedrooms'}</Text>


                        <Text style={styles.rowItemRight}>{detail?.numberofBedrooms}</Text>


                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'No. of bathrooms'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.numberofBathrooms}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'is Available'}</Text>
                        <Text style={styles.rowItemRight}>{(detail?.isAvailable) ?
                            'yes'
                            : 'no'}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Description'}</Text>
                        <Text style={styles.rowItemRight}>{detail?.description}</Text>
                    </View>

                </View>

            </Modal>



            <Modal isVisible={isFormModal}
                onBackButtonPress={() => setFormModal(false)}
                onBackdropPress={() => setFormModal(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'Fill Form'}</Text>



                    <TextInput style={styles.inputstyle} placeholder='Enter Property Name'
                        onChangeText={(v) => setPname(v)}

                    />
                    <TextInput style={styles.inputstyle} placeholder='Enter Address'

                        onChangeText={(v) => setAddress(v)}
                    />

                    <TextInput style={styles.inputstyle} placeholder='Property Type'

                        onChangeText={(v) => setpType(v)}
                    />




                    <TextInput style={styles.inputstyle} placeholder='Enter Rent/month'
                        onChangeText={(v) => setRentPerMonth(v)}
                        keyboardType="numeric"
                    />
                    <TextInput style={styles.inputstyle} placeholder='No. of Bedrooms'
                        onChangeText={(v) => setnoOfBedrooms(v)}
                        keyboardType="numeric"

                    />
                    <TextInput style={styles.inputstyle} placeholder='No. of Bathrooms'
                        onChangeText={(v) => setnoOfBathrooms(v)}
                        keyboardType="numeric"


                    />
                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={isAvailable}
                            onValueChange={(itemValue, itemIndex) => setIsAvailable(itemValue)}
                        >
                            <Picker.Item key={0} label={'select Availability'} color="gray" value={""} />

                            {[{ id: 1, title: 'yess', value: true }, { id: 0, title: 'no', value: false }]?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.value} />
                            ))}
                        </Picker>
                    </View>


                    <TextInput style={styles.inputstyle} placeholder='Description'

                        onChangeText={(v) => setDescription(v)}
                    />










                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => submitData()}
                    >
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>


            <Modal isVisible={isModalUpdate} onBackButtonPress={() => setModalUpdate(false)}
                onBackdropPress={() => setModalUpdate(false)}>

                <View style={styles.formContainer}>

                    <Text style={styles.txtHeading}>{'Fill Form'}</Text>



                    <TextInput style={styles.inputstyle} placeholder='Enter Property Name'
                        onChangeText={(v) => setPname(v)}
                        value={pname}

                    />
                    <TextInput style={styles.inputstyle} placeholder='Enter Address'
                        value={address}
                        onChangeText={(v) => setAddress(v)}
                    />

                    <TextInput style={styles.inputstyle} placeholder='Property Type'
                        value={pType}
                        onChangeText={(v) => setpType(v)}
                    />




                    <TextInput style={styles.inputstyle} placeholder='Enter Rent/month'
                        onChangeText={(v) => setRentPerMonth(v)}
                        value={rentPerMonth.toString()}
                        keyboardType="numeric"
                    />
                    <TextInput style={styles.inputstyle} placeholder='No. of Bedrooms'
                        onChangeText={(v) => setnoOfBedrooms(v)}
                        value={noOfBedrooms.toString()}
                        keyboardType="numeric"

                    />
                    <TextInput style={styles.inputstyle} placeholder='No. of Bathrooms'
                        onChangeText={(v) => setnoOfBathrooms(v)}
                        value={noOfBathrooms.toString()}
                        keyboardType="numeric"


                    />
                    <View style={styles.inputstyle}>
                        <Picker
                            selectedValue={isAvailable}
                            onValueChange={(itemValue, itemIndex) => setIsAvailable(itemValue)}
                        >
                            <Picker.Item key={0} label={'select Availability'} color="gray" value={""} />

                            {[{ id: 1, title: 'yess', value: true }, { id: 0, title: 'no', value: false }]?.map((item) => (
                                <Picker.Item key={item.id} label={item.title} value={item.value} />
                            ))}
                        </Picker>
                    </View>


                    <TextInput style={styles.inputstyle} placeholder='Description'
                        value={description}
                        onChangeText={(v) => setDescription(v)}
                    />










                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => updateData()}
                    >
                        <Text style={styles.textStylebtn}>{'Submit'}</Text>
                    </TouchableOpacity>


                </View>

            </Modal>
        </View>
    )
}
export default PropertyDetails;
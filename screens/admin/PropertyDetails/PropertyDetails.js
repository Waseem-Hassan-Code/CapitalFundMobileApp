import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/colors";
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';
import { deletePropertyDetails, getAllProperties } from "../../../API_Services/BuildingsManagment";
const PropertyDetails = () => {

    const [dataProperty, setDataProperty] = useState();
    useEffect(() => {

        getProperties();

    }, [])
    const getProperties = async () => {


        let properties = await getAllProperties(1, 10);
        setDataProperty(properties?.results?.items)
        console.log(properties?.results?.items);
    }

    const [detailHome, setdetailHome] = useState(null);
    const [modalOptions, setModalOptions] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [currentLoadedData, setLoadedData] = useState();
    const Open_Options = (item) => {

        setdetailHome(item);
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

    const deleteItem = async () => {
        console.log(detailHome?.id);
        let response = await deletePropertyDetails(detailHome?.id);

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

            <Modal isVisible={modalOptions}
                onBackdropPress={() => setModalOptions(false)}
                onBackButtonPress={() => setModalOptions(false)}>

                <View style={{ backgroundColor: 'white', padding: 10, width: '50%', alignSelf: 'center', borderRadius: 10 }}>
                    <TouchableOpacity style={styles.btn} onPress={() => setModalDetail(true)}>
                        <Text style={styles.textStylebtn}>{'Detail'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} >
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
                        <Text style={styles.rowItemRight}>{detailHome?.propertyName}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'address'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.address}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Type of Property'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.typeofProperty}</Text>
                    </View>

                    <View style={styles.RowShow}>

                        <Text style={styles.rowItem}>{'No. of bedrooms'}</Text>


                        <Text style={styles.rowItemRight}>{detailHome?.numberofBedrooms}</Text>


                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'No. of bathrooms'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.numberofBathrooms}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'is Available'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.isAvailable}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Description'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.description}</Text>
                    </View>

                </View>

            </Modal>
        </View>
    )
}
export default PropertyDetails;
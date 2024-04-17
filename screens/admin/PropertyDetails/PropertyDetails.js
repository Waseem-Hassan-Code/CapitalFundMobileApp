import React, { useState } from "react";
import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { styles } from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../constants/colors";
import Modal from "react-native-modal";
const PropertyDetails = () => {

    const [dataProperty, setDataProperty] = useState([
        {
            id: 1, name: 'home 1', address: 'it is address', type: 'its type', noOFBedrooms: 3, noOfBathrooms: 2,
            isAvailable: 'Available', description: 'this is description of house',
        },
        {
            id: 2, name: 'home 2', address: 'it is address', type: 'its type', noOFBedrooms: 3, noOfBathrooms: 2,
            isAvailable: 'Available', description: 'this is description of house',
        },
        {
            id: 3, name: 'home 3', address: 'it is address', type: 'its type', noOFBedrooms: 3, noOfBathrooms: 2,
            isAvailable: 'Available', description: 'this is description of house this is description of house this is description of house',
        },

    ]);

    const [detailHome, setdetailHome] = useState(null);
    const [modalOptions, setModalOptions] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const Open_Options = (item) => {

        setdetailHome(item);
        setModalOptions(true)
    }
    const ShowProperty = ({ item }) => {


        return (
            <View style={styles.showProperty}>
                <Text style={styles.textStyle}>{item.name}</Text>
                <TouchableOpacity style={styles.btn} onPress={() => Open_Options(item)}>
                    <Icon name="expand-more" size={25} color={'white'} />
                </TouchableOpacity>



            </View>
        )
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
                    <TouchableOpacity style={styles.btn}>
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
                        <Text style={styles.rowItemRight}>{detailHome?.name}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'address'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.address}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'Type of Property'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.type}</Text>
                    </View>

                    <View style={styles.RowShow}>
                        
                        <Text style={styles.rowItem}>{'No. of bedrooms'}</Text>
                      
                       
                        <Text style={styles.rowItemRight}>{detailHome?.noOFBedrooms}</Text>

                     
                    </View>

                    <View style={styles.RowShow}>
                        <Text style={styles.rowItem}>{'No. of bathrooms'}</Text>
                        <Text style={styles.rowItemRight}>{detailHome?.noOfBathrooms}</Text>
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
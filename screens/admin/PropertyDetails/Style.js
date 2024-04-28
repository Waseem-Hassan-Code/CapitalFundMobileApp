import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
const styles = StyleSheet.create({

    main: {
        flex: 1, margin: 10
    },
    rightIcons: {
        flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'space-evenly'
    },
    showProperty: {
        padding: 10,   flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', backgroundColor: 'white',  
    },
    textStyle: {
        fontSize: 18
    },
    btn: {
        backgroundColor: COLORS.primary, padding: 3,
        borderRadius: 10, alignItems: 'center',
        justifyContent: 'center',
        margin: 7
    },
    textStylebtn: {
        fontSize: 20, color: 'white'
    },
    RowShow: {
        flexDirection: 'row',  
        justifyContent: "space-between", alignItems: "center", paddingVertical: 3,
        backgroundColor: 'whitesmoke',  marginHorizontal:10, borderBottomWidth: 1, borderColor: 'lightgray'

    },
    detailModal: {
        backgroundColor: 'white', padding: 10, width: '100%',
        alignSelf: 'center', borderRadius: 10,
        paddingVertical: 20
    },
    rowItem: {
        width: '50%', alignSelf: 'center',
    },
    rowItemRight: {
        width: '50%', alignSelf: 'center', textAlign: 'center'
    },
    plusButton: {
        position: 'absolute', right: 20, top: -40, zIndex: 1,
    },
    
    formContainer: {
        width: '100%', backgroundColor: 'white', paddingVertical: 10, alignSelf: 'center',
        borderRadius: 10
    },
    inputstyle: {
        width: '90%', backgroundColor: 'white', borderRadius: 10, color: 'black', alignSelf: 'center',
        padding: 10, borderWidth: 0.5, marginVertical: 5
    },
    txt: {
        margin: 10, color: 'gray'
    },
    btnSubmit: {
        padding: 10, backgroundColor: COLORS.primary, width: '50%', alignSelf: 'center',
        borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 10
    },
    txtHeading: {
        alignSelf: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 10
    },
    yessNo: {
        backgroundColor: COLORS.primary, padding: 10, borderRadius: 5, margin: 10, width: '40%', alignItems: "center",
        justifyContent: "center"
    },
    ysnoBtn: {
        flexDirection: 'row', alignItems: 'center', width: '90%', justifyContent: 'space-evenly',

    },
    textStylebtn2: {
        fontSize: 16, color: 'black', alignSelf: 'center', fontWeight: 'bold'
    },

});
export { styles };
import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
const styles=StyleSheet.create({

    main:{
        flex:1,margin:10
    },
    showProperty:{
        padding:10,marginVertical:3,flexDirection:'row',alignItems:'center',
        justifyContent:'space-between',elevation:5,backgroundColor:'white'
    },
    textStyle:{
        fontSize:18
    },
    btn:{
        backgroundColor:COLORS.primary,padding:3,
        borderRadius:10,alignItems:'center',
        justifyContent:'center',
        margin:7
    },
    textStylebtn:{
        fontSize:20,color:'white'
    },
    RowShow:{
        flexDirection:'row',width:'100%',
        justifyContent:"space-between",alignItems:"center",paddingVertical:10,
        backgroundColor:'white',margin:3,borderBottomWidth:1,borderColor:'lightgray'

    },
    detailModal:{  backgroundColor: 'white', padding: 10, width: '100%',
    alignSelf: 'center', borderRadius: 10},
    rowItem:{
        width:'50%',alignSelf:'center',
    },
    rowItemRight:{
        width:'50%',alignSelf:'center',textAlign:'center'
    }

});
export {styles};
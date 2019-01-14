
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#ececec',
        alignItems:'center'
    },
    textView:{
        width:Metrics.screenWidth - 60,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#444444',
        borderBottomWidth:1,
        marginTop:10
    },
    confirm_btn:{
        marginTop:50,
        width:Metrics.screenWidth - 60,
        height:40,
        backgroundColor:'#939393'
    }
})


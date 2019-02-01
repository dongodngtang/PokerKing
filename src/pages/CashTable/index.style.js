import {Metrics} from "../../configs/Theme";
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    table_view:{
        flex:1,
        backgroundColor:'#3F4042',
        alignItems:'center'
    },
    click_btn:{
        paddingTop:16,
        paddingBottom:16,
        width:Metrics.screenWidth,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#36373A',
        borderColor:"#2D2D2D",
        borderWidth:1
    },
    macao_txt:{
        color:"#ECECEE",
        fontSize:14,
        alignSelf:'center'
    }
})


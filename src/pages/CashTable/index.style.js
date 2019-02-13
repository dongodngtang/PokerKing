import {Metrics} from "../../configs/Theme";
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    table_view:{
        flex:1,
        backgroundColor:'#ECECEE',
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
    },
    jinsha:{
        marginTop:6,
        width:Metrics.screenWidth,
        height:85
    },
    txt_view:{
        flexDirection:'column',
        marginRight:32

    },
    weini_view:{
        flexDirection:'column',
        marginLeft:32,

    },
    txt1:{
        fontSize:20,
        color:"#212223",
        fontWeight:'bold'
    },
    txt2:{
        fontSize:14,
        color:"#AAAAAA",
        marginTop:2
    }
})



import { StyleSheet } from 'react-native';
import {Metrics} from "../../themes";

export default StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#13151C',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop: Metrics.statusBarHeight,
        zIndex:999
    },
    left2: {
        flex: 1,
        height: 44,
        marginLeft:17,
        justifyContent: 'center'
    },
    navTitle: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        flexWrap:'nowrap'
    },
    race_view:{
        flex:1,
        backgroundColor:'#3F4042'
    },
    carousel_view:{
        marginTop:14,
        marginBottom:26
    },
    slide_view:{
        flexDirection:'column',
        alignItems:'center'
    },
    slide_top_view:{
        width:Metrics.screenWidth - 80,
        backgroundColor:"#212223",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:14,
        paddingRight:14,
        borderRadius:4
    },
    race_time_txt:{
        color:"#CCCCCC",
        fontSize:16
    },
    race_time_txt2:{
        color:"#FFE9AD",
        fontSize:16
    },
    slide_img:{
        marginTop:10,
        marginBottom:10,
        width:Metrics.screenWidth - 80,
        height:144,
        borderRadius:4
    },
    personalText:{
        fontSize: 16,
        color: '#ECECEE',
        marginLeft: 30
    },
    personalImg:{
        width: Metrics.reallySize(6),
        height: Metrics.reallySize(16),
        marginRight: 18
    },
    item_view: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor:'#888888',
        borderBottomWidth:1
    },
    img_dy: {
        width: 23,
        height: 23,
        marginLeft: 20
    },
    select_top_view:{
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:8,
        paddingBottom:8
    },
    select_top_txt:{
        fontSize: 18,
        color: '#444444',
        marginLeft: 28,
        fontWeight:'bold'
    }
})


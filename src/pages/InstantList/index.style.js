
import { StyleSheet } from 'react-native';
import {Metrics, px2dp, px2sp} from "../../configs/Theme";
export default StyleSheet.create({
    time_text:{
        color:"#6A6C74",
        fontSize:14
    },
    item: {
        paddingHorizontal: px2dp(22),
        marginTop: px2dp(18),
        alignItems: 'center',
        backgroundColor:'#FFFFFF'
    },
    img: {
        height: px2dp(336),
        width: Metrics.screenWidth - 34,
        alignSelf:'center'
    },
    title: {
        color: '#303236',
        fontSize: px2sp(32)
    },
    time: {
        color: '#6A6C74',
        fontSize: px2sp(28)
    },
    content: {
        marginVertical: px2dp(24)
    },
    rowBack:{
        flex:1,
        marginTop:48,
        backgroundColor:'#888888',
        flexDirection: 'row',
        alignItems:'center'
    },
    delete_img:{
        width:px2dp(44),
        height:px2dp(44)
    },
    delete_text:{
        color:"#FFFFFF",
        fontSize:14,
        marginTop:5
    }
})


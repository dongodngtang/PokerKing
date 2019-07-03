
import { StyleSheet } from 'react-native';
import {Metrics, px2dp, px2sp} from "../../configs/Theme";
export default StyleSheet.create({
    time_text:{
        color:"#6A6C74",
        fontSize:14
    },
    item: {
        paddingHorizontal: px2dp(22),
        marginTop: 7,
        backgroundColor:'#FFFFFF',
        paddingTop:21,
        paddingBottom:25
    },
    img: {
        height: px2dp(336),
        width: Metrics.screenWidth - 34,
        alignSelf:'center'
    },
    title: {
        color: '#303236',
        fontSize: px2sp(32),
        lineHeight:25
    },
    title2:{
        color: '#303236',
        fontSize: px2sp(32),
        fontWeight:'bold',
        lineHeight:25
    },
    title3:{
        color: '#4A90E2',
        fontSize: px2sp(32),
        lineHeight:25
    },
    title4:{
        color: '#64AD10',
        fontSize: px2sp(32),
        fontWeight:'bold',
        lineHeight:25
    }
})


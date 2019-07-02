
import { StyleSheet } from 'react-native';
import {px2dp} from "../../configs/Theme";
export default StyleSheet.create({
    item_view:{
        flexDirection:'row',
        paddingTop:12,
        paddingBottom:12
    },
    notices1_img:{
        width:px2dp(108),
        height:px2dp(108)
    },
    img_view:{
        marginLeft:17
    },
    mid_view:{
        flexDirection:'column',
        marginLeft:22,
        width:'55%',
        alignSelf:'center'
    },
    instants_news:{
        color:"#FFE9AD",
        fontSize:16
    },
    contents:{
        color:"#888888",
        fontSize:14,
        marginTop:8
    },
    time_text:{
        color:"#AAAAAA",
        fontSize:12,
        marginRight:9
    }
})


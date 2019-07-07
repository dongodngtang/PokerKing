import {StyleSheet} from 'react-native';
import {Metrics, px2dp} from "../../configs/Theme";

export default StyleSheet.create({
    top_view: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    person_img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: "#FFE9AD",
        marginLeft: 17
    },
    mid_view: {
        flexDirection: 'column',
        marginLeft: 18
    },
    nick_name: {
        fontSize: 24,
        color: "#FFE9AD"
    },
    member_view: {
        width: 70,
        height: 21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#303236",
        borderRadius: 4
    },
    member_text: {
        color: "#998E72",
        fontSize: 12
    },
    right_img: {
        width: px2dp(22),
        height: px2dp(38),
        marginRight: 17
    },
    items_view:{
        marginTop:35,
        flexDirection:'column'
    },
    item_view:{
        marginLeft:17,
        width:Metrics.screenWidth - 17,
        height:68,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:"#998E72"
    },
    img_dy1:{
        width: px2dp(46),
        height: px2dp(38),
        marginRight:9
    },
    img_dy2:{
        width: px2dp(44),
        height: px2dp(42),
        marginRight:11
    },
    img_dy3:{
        width: px2dp(44),
        height: px2dp(44),
        marginRight:11
    },
    img_dy4:{
        width: px2dp(42),
        height: px2dp(38),
        marginRight:13
    },
    title_text:{
        color: "#FFE9AD",
        fontSize: 15
    },
    read_message:{
        color: "#998E72",
        fontSize: 12,
        marginRight:14
    }

})


import {StyleSheet} from 'react-native';
import {Metrics, px2dp} from "../../configs/Theme";

export default StyleSheet.create({
    upload_text: {
        marginTop: 96,
        marginLeft: 34,
        marginBottom: 34,
        color: "#AAAAAA",
        fontSize: px2dp(28)
    },
    upload_text2: {
        marginLeft: 34,
        color: "#AAAAAA",
        fontSize: px2dp(28),
        marginRight:4
    },
    example_view: {
        width: px2dp(412),
        height: px2dp(256),
        alignSelf: 'center',
        marginBottom: 50
    },
    example_img: {
        width: px2dp(412),
        height: px2dp(256),
        alignSelf: 'center'
    },
    confirm_btn2: {
        width: Metrics.screenWidth - 34,
        alignSelf:'center',
        height: px2dp(88),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#161718",
        marginTop: px2dp(138)
    }
})


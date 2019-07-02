import {StyleSheet} from 'react-native';
import {px2dp} from "../../configs/Theme";

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
    }
})


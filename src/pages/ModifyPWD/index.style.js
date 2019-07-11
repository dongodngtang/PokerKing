import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    old_pwd_view: {
        width: Metrics.screenWidth,
        height: 50,
        backgroundColor: "#212325",
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_text: {
        color: '#AAAAAA',
        fontSize: 16,
        marginLeft: 17
    },
    determine: {
        color: '#212325',
        fontSize: 14
    },
    iphone_change: {
        color: '#AAAAAA',
        fontSize: 16
    },
    confirm_view: {
        width: Metrics.screenWidth - 34,
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE9AD',
        borderRadius: 4,
        marginTop: 61
    },
    iphone_pwd:{
        position:'absolute',
        bottom:47,
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    }
})


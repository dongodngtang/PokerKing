
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    navBar: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    btn_search: {
        width: 50,
        height: 40,
        flexDirection:"row-reverse",
        alignItems: 'center',
    },
    cancel_text: {
        fontSize: 17,
        color: '#FFE9AD'
    },
    title: {
        fontSize: 12,
        color: '#998E72'
    },
    img_search: {
        height: 17,
        width: 17
    },
    nar_text:{
        fontSize: 17,
        color: '#FFE9AD',
        alignSelf:'center',
        maxWidth:'60%'
    }
})


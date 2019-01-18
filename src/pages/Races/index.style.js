
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";
export default StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#13151C',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop: Metrics.statusBarHeight
    },
    left: {
        flex: 1,
        height: 44,
        marginLeft:17,
        justifyContent: 'center'
    },
    navTitle: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center'
    },
})


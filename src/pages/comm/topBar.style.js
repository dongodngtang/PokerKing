import {StyleSheet} from 'react-native';
import {Metrics} from "../../themes";
import {px2dp} from "../../configs/Theme";
import {div} from "../../utils/utils";

export default StyleSheet.create({
    navTop: {
        height: Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left2: {
        // height: 44,
        paddingLeft: 17,
        justifyContent: 'center'
    },
    right2: {
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        alignItems: 'center',
        paddingLeft: 17,
        paddingRight: 42
    },
    navTitle: {
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})
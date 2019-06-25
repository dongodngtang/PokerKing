import {StyleSheet} from 'react-native';
import {Metrics} from "../../themes";

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
        marginLeft:10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    race_view: {
        flex: 1,
        backgroundColor: '#3F4042'
    },
    carousel_view: {
        marginTop: 14,
        marginBottom: 26
    },
    time_view: {
        height: 45,
        width:Metrics.screenWidth,
        backgroundColor:"#1A1B1F",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    date_text:{
        alignSelf:'center',
        color: "#FFE9AD",
        fontSize: 15
    },
    slide_view: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    slide_top_view: {
        width: Metrics.screenWidth - 80,
        backgroundColor: "#212223",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 4
    },
    race_time_txt: {
        color: "#CCCCCC",
        fontSize: 16
    },
    race_time_txt2: {
        color: "#FFE9AD",
        fontSize: 16,
        width: '53%'
    },
    slide_img: {
        marginTop: 10,
        marginBottom: 10,
        width: Metrics.screenWidth - 80,
        height: 144,
        borderRadius: 4
    },
    personalText: {
        fontSize: 16,
        color: '#ECECEE',
        marginLeft: 30
    },
    personalImg: {
        width: Metrics.reallySize(6),
        height: Metrics.reallySize(16),
        marginRight: 18
    },
    item_view: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    img_dy: {
        width: 26,
        height: 24,
        marginLeft: 18
    },
    img_dy1: {
        width: 24,
        height: 22,
        marginLeft: 20
    },
    img_dy2: {
        width: 28,
        height: 26,
        marginLeft: 16
    },
    select_top_view: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12
    },
    select_top_txt: {
        fontSize: 18,
        color: '#444444',
        marginLeft: 28,
        fontWeight: 'bold'
    },
    select_item_txt: {
        fontSize: 14,
        color: '#ECECEE'
    },
    select_item_view1: {
        backgroundColor: "#333436",
        borderLeftWidth: 6,
        borderLeftColor: "#CF1E34"
    },
    select_top_view2: {
        backgroundColor: "#3F4042"
    }
})


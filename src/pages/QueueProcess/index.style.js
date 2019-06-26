import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    topName_view: {
        height: 40,
        width: Metrics.screenWidth,
        backgroundColor: "#1A1B1F",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#736C5B"
    },
    room_waiting: {
        color: "#FFE9AD",
        fontSize: 14
    },
    process_view: {
        flex: 1,
        backgroundColor: "#1A1B1F"
    },
    item_view: {
        width: Metrics.screenWidth - 34,
        backgroundColor: "#303236",
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#736C5B",
    },
    left_view: {
        flex: 1,
        paddingTop: 8,
        paddingBottom: 11,
        flexDirection: 'column',
        borderRightWidth: 1,
        borderRightColor: "#998E72"
    },
    left_top_view: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#736C5B",
        flexDirection: 'column'
    },
    hkd: {
        color: "#FFE9AD",
        fontSize: 12,
        marginTop: 7,
        marginLeft: 7
    },
    left_bottom_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7
    },
    blind: {
        color: "#FFE9AD",
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 7
    },
    table_numbers_text: {
        flex: 1,
        color: "#FFE9AD",
        fontSize: 12
    },
    right_view: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 8,
        paddingBottom:11
    },
    right_top_view:{
        paddingBottom: 8,
        flexDirection:'column'
    },
    ranking: {
        color: "#FFE9AD",
        fontSize: 12,
        marginLeft: 7,
        marginBottom:7
    },
    right_mid_view: {
        alignSelf:'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingLeft: 28,
        paddingBottom: 5,
        paddingRight: 28,
        borderColor: "#998E72",
        borderWidth: 1,
        borderRadius: 4

    },
    application_wait: {
        color: "#FFE9AD",
        fontSize: 12
    },
    ranking_info: {
        alignSelf: 'center'
    },
    ranking_info2: {
        color: "#FFE9AD",
        fontSize: 18
    },
    ranking_info3: {
        color: "#58FF6F",
        fontSize: 24
    }
})


import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    top_txt: {
        color: '#444444',
        fontSize: 22,
        marginTop: 46,
        marginBottom: 54
    },
    textView: {
        width: Metrics.screenWidth - 34,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1,
        flexWrap: 'nowrap'
    },
    confirm_btn: {
        marginTop: 50,
        width: Metrics.screenWidth - 34,
        height: 40,
        backgroundColor: '#939393'
    },
    areaView: {
        width: Metrics.screenWidth - 34,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        width:'90%',
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 17,
        paddingBottom: 17,
        backgroundColor: '#212223',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:4,
        marginTop:54
    },
    down_txt: {
        fontSize: 14,
        color: '#4A90E2'
    }
})


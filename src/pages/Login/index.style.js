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
        width: Metrics.screenWidth - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1,
        marginTop: 15,
        flexWrap: 'nowrap'
    },
    confirm_btn: {
        marginTop: 50,
        width: Metrics.screenWidth - 60,
        height: 40,
        backgroundColor: '#939393'
    },
    areaView: {
        width: Metrics.screenWidth - 60,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ECECEE',
        borderBottomWidth: 1
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
        borderRadius:2,
        marginTop:54
    }
})


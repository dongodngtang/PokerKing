import {StyleSheet} from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    register_container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection:'column',
        alignItems:'center'
    },
    areaView: {
        width: Metrics.screenWidth - 34,
        marginTop: 11,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textView:{
        alignSelf:'center',
        width: Metrics.screenWidth - 34,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    complete:{
        width: Metrics.screenWidth - 34,
        marginLeft: 17,
        marginRight: 17,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#212223',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 54
    }
})


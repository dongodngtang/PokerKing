import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    process_view: {
        flex: 1,
        backgroundColor: "#3F4042"
    },
    item_view: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 17,
        paddingRight: 18
    },
    item_txt:{
        color:"#ECECEE",
        fontSize:14
    },
    selected_item:{
        backgroundColor:"#333436",
        borderLeftColor:"#CF1E34",
        borderLeftWidth:6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 11,
        paddingRight: 18
    },
    manila_process_view:{
        flex: 1,
        backgroundColor: "#ECECEE"
    },
    selected_manila_item:{
        backgroundColor:"#ECECEE",
        borderLeftColor:"#CF1E34",
        borderLeftWidth:6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 11,
        paddingRight: 18
    },
    manila_item_view:{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 18,
        paddingRight: 18
    },
    manila_item_txt:{
        color:"#444444",
        fontSize:18

    }
})


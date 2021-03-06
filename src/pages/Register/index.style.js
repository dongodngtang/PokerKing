
import { StyleSheet } from 'react-native';
import {Metrics} from "../../configs/Theme";

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'white',
        alignItems:'center'
    },
    textView:{
        width:Metrics.screenWidth - 34,
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'#444444',
        borderBottomWidth:1,
        marginTop:15
    },
    confirm_btn:{
        marginTop:50,
        width:Metrics.screenWidth - 34,
        height:40,
        backgroundColor:'#939393'
    },
    btn:{
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
    }
})


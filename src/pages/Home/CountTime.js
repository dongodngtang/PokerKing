import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity,StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Metrics, px2dp} from "../../configs/Theme";
import PercentageCircle from "./PercentageCircle";

export default class CountTime extends Component{

    render(){
        return (
            <LinearGradient
                colors={['#E1BB8D', '#8B6941']}
                style={styles.container}>
                <Text style={styles.title}>澳门扑克王杯-2019/09/23</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:px2dp(14)}}>
                    {[1,2,3,5].map((item,i)=>(
                        <View
                            key={`circle${i}`}
                            style={{alignItems:'center',marginLeft:i===0?0:px2dp(30)}}>
                            <PercentageCircle radius={30} percent={40} color={"#FFF"} innerColor={'#B28F64'} bgcolor={'#4C4530'}>
                                <Text style={styles.lbNum}>30</Text>

                            </PercentageCircle>
                            <Text style={styles.lbTime}>DAYS</Text>
                        </View>
                    ))}
                </View>

            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:px2dp(248),
        borderRadius:px2dp(12),
        alignItems:'center'
    },
    title:{
        color:'#FFF',
        fontSize:14,
        marginTop:px2dp(14)
    },
    lbTime:{
        color:'#FFF',
        fontSize:12,
        marginTop:px2dp(14)
    },
    lbNum:{
        color:'#FFF',
        fontSize:14
    }
})
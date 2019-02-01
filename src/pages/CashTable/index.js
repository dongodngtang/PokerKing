import React, {Component} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images} from "../../configs/Theme";

@connect(({CashTable}) => ({
    ...CashTable,
}))
export default class CashTable extends Component {


    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.table_view}>
                <TouchableOpacity style={[styles.click_btn, {marginTop: 28}]} onPress={()=>{
                    router.toQueueProcess('macao')
                }}>
                    <View style={{width: 6, height: 12, marginRight: 17}}/>
                    <View style={{flex: 1}}/>
                    <Text style={styles.macao_txt}>{global.lang.t('macao')}>>></Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.click_btn, {borderTopWidth: 0}]} onPress={()=>{
                    router.toQueueProcess('manila')
                }}>
                    <View style={{flex: 1,marginLeft:23}}/>
                    <Text style={styles.macao_txt}>{global.lang.t('manila')}>>></Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 12, marginRight: 17}} source={Images.is_right}/>
                </TouchableOpacity>
            </View>
        )
    }
}

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics} from "../../configs/Theme";

@connect(({RegisterNew}) => ({
    ...RegisterNew,
}))
export default class RegisterNew extends Component {

    constructor(props) {
        super(props)
        this.login_name = ''
        this.password = ''
    }


    componentDidMount() {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.regist_view}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                        <View style={styles.input_view}>
                            <Image source={Images.login_gray} style={styles.login_img}/>
                            <TextInput
                                returnKeyType={'done'}
                                keyboardType={'numeric'}
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    width: '85%',
                                    height: 50,
                                    fontSize: 14,
                                    color: '#999999'
                                }}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('set_name')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                onChangeText={txt => {
                                    this.login_name = txt
                                }}

                            />

                        </View>
                        <View style={{height: 1,marginLeft:17, marginRight:17,width:Metrics.screenWidth - 34,backgroundColor:"#ECECEE"}}/>
                        <View style={styles.input_view}>
                            <Image source={Images.psd_gray} style={styles.login_img}/>
                            <TextInput
                                returnKeyType={'done'}
                                keyboardType={'numeric'}
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    width: '85%',
                                    height: 50,
                                    fontSize: 14,
                                    color: '#999999'
                                }}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('set_psd')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                onChangeText={txt => {
                                    this.password = txt
                                }}

                            />

                        </View>
                    </KeyboardAvoidingView>
                </View>

                <TouchableOpacity style={styles.next_btn} onPress={() => {
                    this._next();
                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 17}}>{global.lang.t('login_continue')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

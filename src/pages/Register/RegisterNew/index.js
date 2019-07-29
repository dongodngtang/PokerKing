import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics} from "../../../configs/Theme";
import md5 from "react-native-md5";
import {showToast} from "../../../utils/utils";
import {postCode, verify} from "../../../services/accountDao";

const reg = /^[a-zA-Z][a-zA-z0-9_]{5,15}$/;


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
                        <View style={{
                            height: 1,
                            marginLeft: 17,
                            marginRight: 17,
                            width: Metrics.screenWidth - 34,
                            backgroundColor: "#ECECEE"
                        }}/>
                        <View style={styles.input_view}>
                            <Image source={Images.psd_gray} style={styles.login_img}/>
                            <TextInput
                                returnKeyType={'done'}
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
                    let account = this.login_name
                    let password = this.password
                    if(!reg.test(account)){
                        showToast(global.lang.t('nick_name_english'));
                        return
                    }
                    if(password.length < 6){
                        showToast('密码输入的长度不小于6位');
                        return
                    }
                    // 查询该账户是否被注册过¶
                    verify({
                        account
                    }, ret => {

                        if (ret && ret.exist && ret.exist === 1) {
                            // 已存在
                            showToast('用户名已被注册')
                        } else {
                            router.toMobileRegister({
                                account,
                                password: md5.hex_md5(password)
                            })
                        }

                    })


                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 17}}>{global.lang.t('login_continue')}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

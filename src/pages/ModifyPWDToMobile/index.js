import React, { Component } from 'react';
import { View,Text,KeyboardAvoidingView,TouchableOpacity,Image,TextInput } from 'react-native';
import { connect } from 'react-redux';
import styles from "../ModifyPWD/index.style";
import {Images, px2dp} from "../../configs/Theme";
import {isStrNull, showToast, strNotNull} from "../../utils/utils";
import {postCode} from "../../services/accountDao";
import CountDownButton from "../../components/CountDownButton";


@connect(({ModifyPWDToMobile}) => ({
  ...ModifyPWDToMobile,
}))
export default class ModifyPWDToMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            old_show: false
        }
        this.vsCode = ''
        this.new_pwd = ''
    }

  componentDidMount(){

  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: "#161718"}}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                <View style={[styles.old_pwd_view, {marginTop: 5}]}>
                    <TextInput
                        style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            marginLeft: 17,
                            maxWidth: '60%',
                            height: 50,
                            fontSize: 14,
                            color: '#DDDDDD'
                        }}
                        numberOfLines={1}
                        placeholderTextColor={'#AAAAAA'}
                        placeholder={global.lang.t('vscode')}
                        clearTextOnFocus={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={txt => {
                            this.vsCode = txt

                        }}
                    />
                    <View style={{flex: 1}}/>

                    <CountDownButton
                        bgColor={'#FFE9AD'}
                        disableBg={'#FFE9AD'}
                        style={{
                            height: 50,
                            backgroundColor: '#FFE9AD'
                        }}
                        textStyle={'#212325'}
                        enable
                        onClick={counting => {
                            let iphone = this.iphone
                            if (isStrNull(iphone)) {
                                showToast(global.lang.t('please_input_phone'))
                                return
                            }
                            postCode({
                                mobile: global.loginUser.mobile,
                                country_code: global.loginUser.country_code,
                                option_type: 'login',
                                vcode_type: "mobile",
                            }, data => {
                                counting(true)
                            }, err => {
                                showToast(err)
                            })

                        }}/>
                </View>

                <View style={[styles.old_pwd_view, {marginTop: 1}]}>
                    <TextInput
                        style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 0,
                            marginLeft: 17,
                            width: '65%',
                            height: 50,
                            fontSize: 14,
                            color: '#DDDDDD',
                        }}
                        numberOfLines={1}
                        placeholder={global.lang.t('new_pwd')}
                        placeholderTextColor={'#AAAAAA'}
                        clearTextOnFocus={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={txt => {
                            this.new_pwd = txt

                        }}
                    />
                    <View style={{flex: 1}}/>
                    {strNotNull(this.new_pwd) ?
                        <TouchableOpacity activeOpacity={1} style={{marginLeft: 28}} onPress={() => {
                            this.new_pwd = ''
                        }}>
                            <Image style={{width: px2dp(32), height: px2dp(32)}}
                                   source={Images.delete_pwd}/>
                        </TouchableOpacity> : null}
                    <TouchableOpacity activeOpacity={1} style={{marginLeft: 30, marginRight: 17}} onPress={() => {
                        this.setState({
                            new_show: !this.state.new_show
                        })
                    }}>
                        <Image style={{width: px2dp(36), height: this.state.new_show ? px2dp(34) : px2dp(18)}}
                               source={this.state.new_show ? Images.set_eye : Images.set_eye_close}/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity activeOpacity={1} style={styles.confirm_view}>
                <Text style={styles.determine}>{global.lang.t('determine')}</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={styles.iphone_pwd} onPress={()=>{
                router.toModifyPWD()
            }}>
                <Text style={styles.iphone_change}>{global.lang.t('oldPwd_change')}</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

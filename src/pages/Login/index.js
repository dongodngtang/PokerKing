import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity,Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Images, Metrics} from "../../configs/Theme";
import {isStrNull,showToast} from "../../utils/utils";
import {postVerifyCode} from "../../services/accountDao";

@connect(({Login}) => ({
    ...Login,
}))
export default class Login extends Component {

    state = {
        iphone_show: false,
        vcode_show: false,
        iphone: '',
        vcode: '',
        ext: '86',
        checkAgree:true,
    };

    componentDidMount() {

    }

    _next = () => {
        const {checkAgree,iphone, vcode, ext} = this.state;
        if (checkAgree) {
            if (iphone.length > 1 && vcode.length > 1 && isStrNull(ext)) {
                let body = {
                    option_type: 'register',
                    vcode_type: 'mobile',
                    account: iphone,
                    vcode: vcode,
                    ext: ext
                };

                postVerifyCode(body, data => {
                    router.toRegister(this.props, iphone, vcode, ext)
                }, err => {
                    showToast(err)
                })


            }
            else
                showToast(`${global.lang.t('fillWhole')}`);
        }
        else
            showToast(global.lang.t('need_agree'));
    };


    render() {

        return (
            <View style={styles.container}>

                <Text style={styles.top_txt}>{global.lang.t('sign_vscode')}</Text>

                <TouchableOpacity style={styles.areaView} onPress={() => {
                    this.areaAction && this.areaAction.toggle();
                }}>
                    <Text
                        style={{width: 180, marginLeft: 8, height: 28,fontSize:16,color:'#666666'}}>
                        {`中国（China） (+${this.state.ext})`}
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width:6,height:16,marginRight:10}} source={Images.is_right}/>

                </TouchableOpacity>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 230,
                                height: 35,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: this.state.email_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('cellphone')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.iphone_show = true;
                                this.setState({
                                    iphone: txt
                                })
                            }}

                        />

                    </View>
                    <View style={styles.textView}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 160,
                                height: 35,
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: this.state.name_show ? '#444444' : '#F3F3F3'
                            }}
                            maxLength={11}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.state.vcode_show = true;
                                this.setState({
                                    vcode: txt
                                })
                            }}

                        />
                        <View style={{flex: 1}}/>
                        <View style={{height: 22, width: 1, backgroundColor: '#ECECEE', marginRight: 16}}/>
                        <TouchableOpacity style={{marginRight:8}}>
                            <Text style={{color: '#4A90E2', fontSize: 14}}>{global.lang.t('get_vscode')}</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.btn} onPress={()=>{
                    this._next();
                }}>
                    <Text style={{color:'#FFE9AD',fontSize:18}}>{global.lang.t('login_continue')}</Text>
                </TouchableOpacity>

                <ExtArea
                    ref={ref => this.areaAction = ref}
                    changed_ext={this.changed_ext}/>
            </View>
        )
    }

    changed_ext = (code) => {
        this.setState({
            ext: code
        })
    }
}

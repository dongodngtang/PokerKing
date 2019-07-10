import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Images, Metrics, Colors} from "../../configs/Theme";
import {getAvatar, isStrNull, logMsg, showToast} from "../../utils/utils";
import {verify, postCode, register, login, verify_code} from "../../services/accountDao";
import CountDownButton from '../../components/CountDownButton'
import SelectPiker from "../comm/SelectPiker";
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info'


@connect(({Login}) => ({
    ...Login,
}))
export default class Login extends Component {


    constructor(props) {
        super(props)

        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文']
        };
        this.userName = ''
        this.pwd = ''
        props.navigation.setParams({
            onRight: () => {
                this.selectPiker && this.selectPiker.toggle()
            }
        })
    };

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };

    componentDidMount() {

    }

    _next = () => {
        let userName = this.userName
        let pwd = this.pwd
        if (userName.length > 1 && pwd.length > 1) {
            verify_code({
                account: userName,
                country_code: '86',
                option_type: 'login',
                vcode_type: 'mobile',
                vcode: '201919'
            }, res => {
                // 查询该账户是否被注册过¶
                verify({
                    account: userName,
                    country_code: '86'
                }, ret => {
                    if (ret && ret.exist && ret.exist === 1) {
                        // 登录
                        login({
                            type: 'vcode',
                            mobile: userName,
                            vcode:'201919',
                            country_code: '86'
                        }, ret => {
                            showToast(global.lang.t('login_success'))
                            this.props.navigation.popToTop()
                        }, err => {

                        })
                    } else {
                        // 注册

                    }

                }, err => {

                })
            })

        }
        else
            showToast(`${global.lang.t('fillWhole')}`);
    };


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={{marginTop: 20, alignSelf: 'flex-end', marginRight: 17}} onPress={() => {
                    router.toRegisterNew()
                }}>
                    <Text style={{color: "#FFE9AD", fontSize:14}}>{global.lang.t("zhuce")}</Text>
                </TouchableOpacity>

                <Image source={getAvatar('')} style={styles.person_img}/>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView2}>
                        <Image source={Images.login} style={styles.login_img}/>
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
                            placeholder={global.lang.t('nameormobile')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.userName = '13640988285'
                            }}

                        />

                    </View>
                    <View style={{height: 1}}/>
                    <View style={styles.textView2}>
                        <Image source={Images.psd} style={styles.login_img}/>
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
                            maxLength={6}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('psd')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.pwd = '201919'
                            }}

                        />

                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    this._next();
                }}>
                    <Text style={{color: '#303236', fontSize: 17}}>{global.lang.t('login')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginLeft: 17,
                        marginRight: 17,
                        position: 'absolute',
                        bottom: 48,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        router.toProtocolPage()
                    }}>
                    <Text style={{color: "#AAAAAA", fontSize: 12}}>{global.lang.t('protocol1')}<Text style={{
                        color: "#998E72",
                        fontSize: 12,
                        marginLeft: 8
                    }}>{`《${global.lang.t('protocol2')}》`}</Text></Text>
                </TouchableOpacity>


                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>


            </View>
        )
    };

}

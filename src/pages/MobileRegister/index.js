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

@connect(({MobileRegister}) => ({
    ...MobileRegister,
}))
export default class MobileRegister extends Component {
    constructor(props) {
        super(props)
        let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
        const userCountryData = getAllCountries()
            .filter(country => country.cca2 === userLocaleCountryCode)
            .pop()
        let callingCode = '86'
        let areaName = 'China'
        let cca2 = userLocaleCountryCode
        if (!cca2 || !userCountryData) {
            cca2 = 'CN'
            callingCode = '86'
        } else {
            callingCode = userCountryData.callingCode
            areaName = userCountryData.name.common
        }


        this.state = {
            ext: callingCode,
            areaName: areaName,
            cca2: cca2,
        };
        this.iphone = ''
        this.vcode = ''
    };

    componentDidMount() {

    }

    render() {
        const {ext, areaName} = this.state;
        return (
            <View style={styles.register_container}>


                <TouchableOpacity style={styles.areaView} onPress={() => {
                    this.areaAction && this.areaAction.openModal();
                }}>
                    <CountryPicker
                        styles={{
                            touchFlag: {
                                marginBottom: 12
                            }
                        }}
                        ref={ref => this.areaAction = ref}
                        filterable
                        closeable
                        onChange={value => {
                            logMsg(value)
                            this.setState({
                                areaName: value.name,
                                ext: value.callingCode,
                                cca2: value.cca2
                            })
                        }}
                        cca2={this.state.cca2}
                        translation="eng"
                    />

                    <Text
                        style={{width: 180, marginLeft: 8, height: 28, fontSize: 16, color: '#666666'}}>
                        {`${areaName} (+${this.state.ext})`}
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>

                </TouchableOpacity>
                <View style={{
                    height: 1,
                    marginLeft: 17,
                    marginRight: 17,
                    width: Metrics.screenWidth - 34,
                    backgroundColor: "#ECECEE"
                }}/>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: '85%',
                                height: 50,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('cellphone')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.iphone = txt
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
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 160,
                                height: 35,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            maxLength={6}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.vcode = txt
                            }}

                        />
                        <View style={{flex: 1}}/>
                        <View style={{height: 22, width: 1, backgroundColor: '#ECECEE', marginRight: 16}}/>
                        <CountDownButton
                            disableBg={'#F3F3F3'}
                            disableColor={'#747474'}
                            style={{
                                marginRight: 8,
                                height: 50,
                                backgroundColor: 'white'
                            }}
                            textStyle={styles.down_txt}
                            enable
                            onClick={counting => {
                                let iphone = this.iphone
                                if (isStrNull(iphone)) {
                                    showToast(global.lang.t('please_input_phone'))
                                    return
                                }
                                postCode({
                                    mobile: iphone,
                                    country_code: ext,
                                    option_type: 'login',
                                    vcode_type: "mobile",
                                }, data => {
                                    counting(true)
                                }, err => {
                                    showToast(err)
                                })

                            }}/>

                    </View>
                </KeyboardAvoidingView>
                <View style={{
                    height: 1,
                    marginLeft: 17,
                    marginRight: 17,
                    width: Metrics.screenWidth - 34,
                    backgroundColor: "#ECECEE"
                }}/>
                <TouchableOpacity style={styles.complete} onPress={() => {
                    // this._next();
                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 17}}>{global.lang.t('complete')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        marginLeft: 17,
                        marginRight: 17,
                        position: 'absolute',
                        bottom:56, alignSelf:'center', flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                        router.toProtocolPage()
                    }}>
                    <Text style={{color: "#999999", fontSize: 14}}>{global.lang.t('mobile_prompt')}</Text>
                </TouchableOpacity>


            </View>
        )
    };

    onSelectMenu = (index, subindex, data) => {
        this.setState({
            ext: data.subtitle,
            areaName: data.title
        });
    };

    changed_ext = (code, name) => {
        this.setState({
            ext: code,
            areaName: name
        })
    }
}

import React, {Component} from 'react';
import {View, Text, Button, KeyboardAvoidingView, TextInput, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from "./index.style";
import {Images, Metrics} from "../../configs/Theme";
import {ActionSheet} from '../../components';
import {register} from "../../services/accountDao";
import {isStrNull, logMsg, showToast} from "../../utils/utils";
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info'


export default class Register extends Component {
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
            name_show: false,
            email_show: false,
            genderTxt: '',
            nickStr: '',
            username: '',
            uploadTxt:'',
            birthTxt:'',
            countryTxt:'',
            cca2:cca2
        }
        this.user_name = ''
        this.email = ''
        this.gender = 0
    }


    _getGender = (gender) => {
        logMsg(gender)
        if (gender !== 0) {
            this.gender = gender
            this.setState({
                genderTxt: gender === 1 ? global.lang.t('male') : global.lang.t('female')
            })
        }


    }

    trimNumber = (str) => {
        return str.replace(/\d+/g, '');
    }


    render() {
        return (
            <View style={styles.resgister_container}>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={[styles.textView, {marginTop: 30}]}>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: '90%',
                                height: 50,
                                fontSize: 16,
                                color: '#444444',
                            }}
                            maxLength={25}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('username_EC')}
                            clearTextOnFocus={true}
                            autoCapitalize={'characters'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.user_name = txt.trim()

                            }}
                        />

                    </View>

                    <View style={[styles.textView, {height: 50}]}>
                        <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                                          onPress={() => {
                                              this.actionGender && this.actionGender.show()
                                          }}>
                            <Text style={{
                                color: '#CCCCCC',
                                marginLeft: 8,
                                fontSize: 16
                            }}>{global.lang.t('gender')}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{
                                color: '#444444',
                                marginRight: 14,
                                fontSize: 16
                            }}>{this.state.genderTxt}</Text>
                            <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>
                        </TouchableOpacity>
                    </View>

                    {/*出生日期*/}
                    <View style={[styles.textView, {height: 50}]}>
                        <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                                          onPress={() => {
                                          }}>
                            <Text style={{
                                color: '#CCCCCC',
                                marginLeft: 8,
                                fontSize: 16
                            }}>{global.lang.t('birth')}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{
                                color: '#444444',
                                marginRight: 14,
                                fontSize: 16
                            }}>{this.state.birthTxt}</Text>
                            <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textView}>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: '95%',
                                height: 50,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            // maxLength={25}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('mailbox')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.email = txt
                            }}
                        />
                        <View style={{flex: 1}}/>
                    </View>

                    {/*国籍*/}
                    <View style={[styles.textView, {height: 50}]}>
                        <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                                          onPress={() => {
                                            this.areaAction && this.areaAction.openModal();
                                          }}>
                            <Text style={{
                                color: '#CCCCCC',
                                marginLeft: 8,
                                fontSize: 16
                            }}>{global.lang.t('country')}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{
                                color: '#444444',
                                marginRight: 14,
                                fontSize: 16
                            }}>{this.state.countryTxt}</Text>
                            <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>
                        </TouchableOpacity>
                    </View>

                    {/*证件上传*/}
                    <View style={[styles.textView, {height: 50}]}>
                        <TouchableOpacity style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}
                                          onPress={() => {
                                              router.toUploadDocument()
                                          }}>
                            <Text style={{
                                color: '#CCCCCC',
                                marginLeft: 8,
                                fontSize: 16
                            }}>{global.lang.t('document_upload')}</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{
                                color: '#444444',
                                marginRight: 14,
                                fontSize: 16
                            }}>{this.state.uploadTxt}</Text>
                            <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

                <Text style={{
                    color: '#AAAAAA',
                    fontSize: 12,
                    marginTop: 40,
                    marginLeft: 17,
                    marginRight:17,
                    maxWidth:Metrics.screenWidth - 34
                }}>{global.lang.t('prompt')}</Text>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    let body = this.props.params;
                    body.nickname = this.user_name;
                    body.gender = this.gender;
                    body.email = this.email;

                    if (this.gender === 0) {
                        showToast(global.lang.t('select_gender'))
                    } else if (isStrNull(this.email)) {
                        showToast(global.lang.t('input_email'))
                    } else {
                        register(body, ret => {
                            showToast(global.lang.t('register_success'))
                            this.props.navigation.popToTop()
                        }, err => {

                        })
                    }
                }}>
                    <Text style={{color: '#FFE9AD', fontSize: 18}}>{global.lang.t('determine')}</Text>
                </TouchableOpacity>

                <ActionSheet
                    ref={o => this.actionGender = o}
                    title={global.lang.t('choose_gender')}
                    options={[global.lang.t('cancel'), global.lang.t('male'), global.lang.t('female')]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this._getGender}
                />

              <CountryPicker
                styles={{
                  touchFlag: {
                    marginBottom: 12
                  }
                }}
                ref={ref => this.areaAction = ref}
                filterable
                closeable
                showCallingCode={false}
                onChange={value => {
                  logMsg(value)
                  this.setState({
                    countryTxt: value.name,
                    cca2: value.cca2
                  })
                }}
                translation="eng"
                cca2={this.state.cca2}
              >
                <View/>
              </CountryPicker>
            </View>
        )
    }
}

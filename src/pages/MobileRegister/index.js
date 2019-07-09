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

  componentDidMount(){

  }

  render() {
    return (
      <View style={{flex:1}}>
        <Text>MobileRegister</Text>
      </View>
    )
  }
}
